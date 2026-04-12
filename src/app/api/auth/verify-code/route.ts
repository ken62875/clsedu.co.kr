import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { contactValue, code } = await request.json();
    const phone = contactValue;

    if (!phone || !code) {
      return NextResponse.json({ error: '전화번호와 인증번호를 모두 입력해주세요.' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');

    const tokenRecord = await prisma.phoneVerificationToken.findFirst({
      where: {
        phone: cleanPhone,
        token: code
      }
    });

    if (!tokenRecord) {
      return NextResponse.json({ error: '인증번호가 일치하지 않거나 유효하지 않습니다.' }, { status: 401 });
    }

    if (new Date() > tokenRecord.expiresAt) {
      await prisma.phoneVerificationToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.json({ error: '인증번호가 만료되었습니다. 다시 시도해주세요.' }, { status: 401 });
    }

    // 찾은 유저
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: cleanPhone },
          { phone: phone }
        ]
      }
    });

    if (!user) {
      return NextResponse.json({ error: '해당 휴대폰 번호로 등록된 학생 정보가 없습니다.' }, { status: 404 });
    }

    // 성공 시 토큰 삭제
    await prisma.phoneVerificationToken.delete({ where: { id: tokenRecord.id } });

    // 사용자의 비밀번호가 설정되어 있는지 확인
    const isPasswordSet = !!user.password;
    const resetToken = Buffer.from(user.id).toString('base64');

    return NextResponse.json({ 
      success: true, 
      isPasswordSet, // 클라이언트에서 이 값에 따라 분기처리 (true면 바로 로그인/비밀번호 확인창, false면 비밀번호 설정창)
      resetToken // set-password 화면으로 넘어갈 때만 제한적으로 사용
    });

  } catch (error) {
    console.error("인증번호 확인 에러:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
