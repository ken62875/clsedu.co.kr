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

  } catch (error: any) {
    console.error('Login error:', error);
    
    // 디버깅 목적으로 users 테이블의 실제 컬럼들을 조회 시도 (보안상 개발 완료 시 제거)
    let debugCols = "조회 실패";
    try {
      const cols: any = await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = 'users'`;
      debugCols = cols.map((c: any) => c.column_name).join(", ");
    } catch (e) {
      debugCols = "오류 발생: " + String(e);
    }

    return NextResponse.json({ 
      error: 'Internal Server Error', 
      debugDetail: `${error?.message || String(error)}\n\n[실제 컬럼 목록]\n${debugCols}`
    }, { status: 500 });
  }
}
