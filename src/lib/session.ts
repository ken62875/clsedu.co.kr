import crypto from 'crypto';

export type SessionPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
};

const SESSION_COOKIE_NAME = 'cls_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7일

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET 환경변수가 설정되지 않았거나 너무 짧습니다(32자 이상 필요).'
    );
  }
  return secret;
}

function base64urlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64urlDecode(str: string): Buffer {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  return Buffer.from(
    str.replace(/-/g, '+').replace(/_/g, '/') + pad,
    'base64'
  );
}

function sign(data: string): string {
  return base64urlEncode(
    crypto.createHmac('sha256', getSecret()).update(data).digest()
  );
}

// 페이로드를 HMAC-SHA256 서명된 문자열로 직렬화합니다.
// 반환 형식: `<base64url(payload)>.<base64url(signature)>`
export function encodeSession(payload: SessionPayload): string {
  const json = JSON.stringify(payload);
  const body = base64urlEncode(Buffer.from(json, 'utf8'));
  const signature = sign(body);
  return `${body}.${signature}`;
}

export function decodeSession(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, signature] = parts;
  const expected = sign(body);
  // 서명 비교는 타이밍 공격을 방지하기 위해 상수 시간 비교 사용
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const json = base64urlDecode(body).toString('utf8');
    const parsed = JSON.parse(json) as SessionPayload;
    if (!parsed?.id || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export const sessionCookie = {
  name: SESSION_COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
};
