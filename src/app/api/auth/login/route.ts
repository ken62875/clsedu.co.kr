import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encodeSession, sessionCookie } from '@/lib/session';
import { serverError } from '@/lib/api';
import { isNonEmpty } from '@/lib/validation';

type UserRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  password: string | null;
  role: string;
  avatarUrl: string | null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userid, password } = body as { userid?: string; password?: string };

    if (!isNonEmpty(userid) || !isNonEmpty(password)) {
      return NextResponse.json(
        { error: '이메일/휴대폰과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Prisma Client 파싱 충돌을 방지하기 위해 $queryRaw 사용 (role을 text로 강제 캐스팅)
    const users = await prisma.$queryRaw<UserRow[]>`
      SELECT id, name, email, phone, password_hash as password, role::text as role, avatar_url as "avatarUrl"
      FROM users
      WHERE email = ${userid} OR phone = ${userid}
      LIMIT 1
    `;
    const user = users[0];

    // User enumeration 방지를 위해 공통 에러 메시지 사용
    const invalid = () =>
      NextResponse.json(
        { error: '아이디 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );

    if (!user) return invalid();

    if (!user.password) {
      return NextResponse.json(
        { error: 'PASSWORD_NOT_SET', message: '비밀번호 설정이 필요합니다.' },
        { status: 403 }
      );
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return invalid();

    const session = {
      id: user.id,
      name: user.name,
      email: user.email || userid,
      role: (user.role as string).toLowerCase(),
      avatarUrl: user.avatarUrl,
    };

    const response = NextResponse.json({ success: true, user: session });
    response.cookies.set(sessionCookie.name, encodeSession(session), sessionCookie.options);
    return response;
  } catch (error) {
    return serverError('로그인 처리 중 오류가 발생했습니다.', error);
  }
}
