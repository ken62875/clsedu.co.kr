import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userid, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userid },
          { phone: userid }
        ]
      }
    });

    if (!user) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // 비밀번호 미설정 사용자 검증
    if (!user.password) {
      return NextResponse.json({ error: 'PASSWORD_NOT_SET', message: '비밀번호 설정이 필요합니다.' }, { status: 403 });
    }

    // bcrypt 해시 비교
    const isValid = bcrypt.compareSync(password, user.password);
    
    if (!isValid) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    const userData = { id: user.id, name: user.name, email: user.email || userid, role: user.role };

    // Next.js HTTP-Only 쿠키로 세션 저장
    const response = NextResponse.json({ success: true, user: userData });
    response.cookies.set('cls_session', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7일 유지
    });
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
