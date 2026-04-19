import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { serverError } from '@/lib/api';
import { isStrongPassword, PASSWORD_RULE_MESSAGE } from '@/lib/validation';

// verify-code 에서 발급한 단기 토큰(PasswordResetToken)을 검증하고 비밀번호를 설정합니다.
export async function POST(request: Request) {
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    if (!isStrongPassword(newPassword)) {
      return NextResponse.json({ error: PASSWORD_RULE_MESSAGE }, { status: 400 });
    }

    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token: resetToken },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { error: '유효하지 않은 검증 토큰입니다.' },
        { status: 401 }
      );
    }

    if (tokenRecord.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.json(
        { error: '검증 토큰이 만료되었습니다. 다시 시도해주세요.' },
        { status: 401 }
      );
    }

    // verify-code 에서 이메일 미존재 시 `phone:<번호>` 형식으로 저장했으므로 양쪽을 처리합니다.
    let user = null as { id: string } | null;
    if (tokenRecord.email.startsWith('phone:')) {
      const phone = tokenRecord.email.slice('phone:'.length);
      user = await prisma.user.findFirst({ where: { phone }, select: { id: true } });
    } else {
      user = await prisma.user.findFirst({
        where: { email: tokenRecord.email },
        select: { id: true },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
      select: { id: true },
    });

    // 사용된 토큰 삭제 (재사용 방지)
    await prisma.passwordResetToken.delete({ where: { id: tokenRecord.id } });

    return NextResponse.json({
      success: true,
      message: '비밀번호가 성공적으로 설정되었습니다. 이제 로그인해주세요.',
    });
  } catch (error) {
    return serverError('비밀번호 설정 중 오류가 발생했습니다.', error);
  }
}
