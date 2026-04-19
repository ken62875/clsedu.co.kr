import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { decodeSession, sessionCookie, type SessionPayload } from './session';

// 서버 컴포넌트 / API 라우트에서 현재 로그인 세션을 조회합니다.
// 쿠키가 없거나 서명이 유효하지 않으면 null 을 반환합니다.
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(sessionCookie.name)?.value;
  return decodeSession(raw);
}

// API 라우트 전용 — 로그인이 필수일 때 사용합니다.
// 로그인 상태면 세션 객체, 아니면 401 응답을 반환합니다.
export async function requireAuth(): Promise<
  { session: SessionPayload; response: null } | { session: null; response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      session: null,
      response: NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      ),
    };
  }
  return { session, response: null };
}

// 특정 역할만 접근할 수 있을 때 사용합니다. (ex: PARENT, STUDENT 전용 페이지)
export async function requireRole(
  allowed: string[]
): Promise<
  { session: SessionPayload; response: null } | { session: null; response: NextResponse }
> {
  const auth = await requireAuth();
  if (!auth.session) return auth;
  const role = auth.session.role?.toUpperCase();
  const ok = allowed.map((r) => r.toUpperCase()).includes(role);
  if (!ok) {
    return {
      session: null,
      response: NextResponse.json(
        { error: '접근 권한이 없습니다.' },
        { status: 403 }
      ),
    };
  }
  return auth;
}
