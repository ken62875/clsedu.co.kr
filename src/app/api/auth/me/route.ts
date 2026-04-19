import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sessionCookie } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ isLoggedIn: false, user: null }, { status: 401 });
  }
  return NextResponse.json({ isLoggedIn: true, user: session });
}

export async function POST() {
  // 로그아웃 (세션 쿠키 삭제)
  const response = NextResponse.json({ success: true });
  response.cookies.delete(sessionCookie.name);
  return response;
}
