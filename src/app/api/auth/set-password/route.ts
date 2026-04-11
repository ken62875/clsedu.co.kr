import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    // 토큰 복호화 (Base64)
    const userId = Buffer.from(resetToken, 'base64').toString('utf8');

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: '유효하지 않은 검증 토큰입니다.' }, { status: 401 });
    }

    // 비밀번호 해싱
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // DB 업데이트
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ 
      success: true, 
      message: '비밀번호가 성공적으로 설정되었습니다. 이제 로그인해주세요.' 
    });

  } catch (error) {
    console.error('Set Password Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
