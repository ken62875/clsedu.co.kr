import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { serverError } from '@/lib/api';
import { isNonEmpty, normalizePhone } from '@/lib/validation';

// 휴대폰 SMS 인증번호 확인 후 비밀번호 설정용 단기 토큰(10분)을 발급합니다.
// 종전 방식은 `Buffer.from(user.id).toString('base64')` 라서 누구나 타 사용자 ID 로 변조할 수 있었습니다.
// 지금은 crypto.randomBytes(32) 기반 토큰을 생성하고 PasswordResetToken 테이블에 저장합니다.
export async function POST(request: Request) {
  try {
    const { contactValue, code } = await request.json();
    const phone = contactValue;

    if (!isNonEmpty(phone) || !isNonEmpty(code)) {
      return NextResponse.json(
        { error: '전화번호와 인증번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const cleanPhone = normalizePhone(phone);

    const tokenRecord = await prisma.phoneVerificationToken.findFirst({
      where: { phone: cleanPhone, token: code },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { error: '인증번호가 일치하지 않거나 유효하지 않습니다.' },
        { status: 401 }
      );
    }

    if (new Date() > tokenRecord.expiresAt) {
      await prisma.phoneVerificationToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.json(
        { error: '인증번호가 만료되었습니다. 다시 시도해주세요.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ phone: cleanPhone }, { phone }] },
    });

    if (!user) {
      return NextResponse.json(
        { error: '해당 휴대폰 번호로 등록된 학생 정보가 없습니다.' },
        { status: 404 }
      );
    }

    // 성공 시 휴대폰 인증 토큰 삭제
    await prisma.phoneVerificationToken.delete({ where: { id: tokenRecord.id } });

    // 안전한 랜덤 토큰 발급 (10분 유효)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // PasswordResetToken 테이블의 email 컬럼을 재활용해 사용자 식별자를 보관합니다.
    // email 이 없는 사용자는 `phone:<번호>` 형태로 저장합니다.
    await prisma.passwordResetToken.create({
      data: {
        email: user.email || `phone:${cleanPhone}`,
        token: resetToken,
        expiresAt,
      },
    });

    const isPasswordSet = !!user.password;

    return NextResponse.json({
      success: true,
      isPasswordSet,
      resetToken,
    });
  } catch (error) {
    return serverError('인증번호 확인 중 오류가 발생했습니다.', error);
  }
}
