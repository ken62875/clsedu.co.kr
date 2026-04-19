import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { serverError } from '@/lib/api';
import { isStrongPassword, PASSWORD_RULE_MESSAGE } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: '유효하지 않은 요청입니다. 토큰과 새 비밀번호가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json({ error: PASSWORD_RULE_MESSAGE }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: '유효하지 않거나 만료된 토큰입니다.' },
        { status: 400 }
      );
    }

    if (resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      return NextResponse.json(
        { error: '비밀번호 재설정 링크가 만료되었습니다. 다시 요청해주세요.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email: resetToken.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 400 });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: passwordHash },
      select: { id: true },
    });

    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return NextResponse.json({
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다.',
    });
  } catch (error) {
    return serverError('비밀번호 재설정 처리 중 오류가 발생했습니다.', error);
  }
}
