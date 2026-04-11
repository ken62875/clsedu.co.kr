import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('cls_session')?.value;

  if (sessionData) {
    try {
      const user = JSON.parse(sessionData);
      return NextResponse.json({ isLoggedIn: true, user });
    } catch (e) {
      return NextResponse.json({ isLoggedIn: false, user: null }, { status: 401 });
    }
  }

  return NextResponse.json({ isLoggedIn: false, user: null }, { status: 401 });
}

export async function POST() {
  // 로그아웃 (세션 쿠키 삭제)
  const response = NextResponse.json({ success: true });
  response.cookies.delete('cls_session');
  return response;
}
