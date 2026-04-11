import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: '유효하지 않은 요청입니다. 토큰 번호와 새로운 비밀번호가 필요합니다.' }, { status: 400 });
    }

    // Prisma에서 토큰 확인
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json({ error: '유효하지 않거나 만료된 토큰입니다.' }, { status: 400 });
    }

    if (resetToken.expiresAt < new Date()) {
      // 만료된 토큰 삭제
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      return NextResponse.json({ error: '비밀번호 재설정 링크가 만료되었습니다. 다시 요청해주세요.' }, { status: 400 });
    }

    // users 테이블에서 사용자 확인
    const users: any[] = await prisma.$queryRaw`
      SELECT id, email FROM users WHERE email = ${resetToken.email} LIMIT 1
    `;
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 400 });
    }

    // 비밀번호 해싱 (bcrypt.hashSync는 비동기 처리 안 해도 됨, 코스트 10)
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // users 테이블 업데이트 - schema의 User는 password_hash 로 매핑되어 있으므로 raw 처리
    await prisma.$executeRaw`
      UPDATE users SET password_hash = ${passwordHash} WHERE id = ${user.id}
    `;

    // 사용된 토큰 삭제
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id }
    });

    return NextResponse.json({ success: true, message: '비밀번호가 성공적으로 변경되었습니다.' });

  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json({ 
      error: '비밀번호 재설정 처리 중 시스템 오류가 발생했습니다.',
      debugDetail: process.env.NODE_ENV === 'development' ? (error?.message || String(error)) : undefined
    }, { status: 500 });
  }
}
