import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { serverError } from '@/lib/api';
import {
  isEmail,
  isPhone,
  isStrongPassword,
  normalizePhone,
  PASSWORD_RULE_MESSAGE,
} from '@/lib/validation';

export async function GET() {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true },
    });
    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (err) {
    // avatar_url 컬럼 미존재(P2022) 시 제외하고 재조회
    if ((err as { code?: string })?.code === 'P2022') {
      try {
        const user = await prisma.user.findUnique({
          where: { id: session.id },
          select: { id: true, name: true, email: true, phone: true, role: true },
        });
        if (!user) return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
        return NextResponse.json({ user: { ...user, avatarUrl: null } });
      } catch (inner) {
        return serverError('프로필을 불러오는 데 실패했습니다.', inner);
      }
    }
    return serverError('프로필을 불러오는 데 실패했습니다.', err);
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  try {
    const body = await request.json().catch(() => ({}));
    const { phone, email, currentPassword, newPassword } = body as {
      phone?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
    };

    const updateData: Record<string, unknown> = {};

    if (email !== undefined) {
      if (email && !isEmail(email)) {
        return NextResponse.json({ error: '유효하지 않은 이메일 형식입니다.' }, { status: 400 });
      }
      updateData.email = email || null;
    }

    if (phone !== undefined) {
      if (phone && !isPhone(phone)) {
        return NextResponse.json(
          { error: '유효하지 않은 전화번호 형식입니다. (예: 010-1234-5678)' },
          { status: 400 }
        );
      }
      updateData.phone = phone ? normalizePhone(phone) : null;
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: '현재 비밀번호를 입력해주세요.' }, { status: 400 });
      }
      if (!isStrongPassword(newPassword)) {
        return NextResponse.json({ error: PASSWORD_RULE_MESSAGE }, { status: 400 });
      }
      const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: { password: true },
      });
      if (!user?.password) {
        return NextResponse.json(
          { error: '비밀번호가 설정되지 않은 계정입니다.' },
          { status: 400 }
        );
      }
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        return NextResponse.json(
          { error: '현재 비밀번호가 일치하지 않습니다.' },
          { status: 400 }
        );
      }
      updateData.password = bcrypt.hashSync(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: '수정할 내용이 없습니다.' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.id },
      data: updateData,
      select: { id: true },
    });
    return NextResponse.json({ success: true, message: '프로필이 업데이트되었습니다.' });
  } catch (err) {
    if ((err as { code?: string })?.code === 'P2002') {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일 또는 전화번호입니다.' },
        { status: 409 }
      );
    }
    return serverError('프로필 업데이트에 실패했습니다.', err);
  }
}
