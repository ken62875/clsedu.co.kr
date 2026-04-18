import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function getSession() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('cls_session')?.value;
  if (!sessionData) return null;
  try {
    return JSON.parse(sessionData) as { id: string; name: string; email: string; role: string; avatarUrl?: string };
  } catch {
    return null;
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

  try {
    // avatarUrl 포함 조회 시도
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true },
    });
    if (!user) return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err: any) {
    // avatar_url 컬럼 미존재(P2022) 시 제외하고 재조회
    if (err.code === 'P2022') {
      const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: { id: true, name: true, email: true, phone: true, role: true },
      });
      if (!user) return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
      return NextResponse.json({ user: { ...user, avatarUrl: null } });
    }
    console.error('프로필 조회 실패:', err);
    return NextResponse.json({ error: '프로필을 불러오는 데 실패했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

  try {
    const body = await request.json();
    const { phone, email, currentPassword, newPassword } = body;

    const updateData: Record<string, unknown> = {};

    if (phone !== undefined) updateData.phone = phone || null;
    if (email !== undefined) updateData.email = email || null;

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: '현재 비밀번호를 입력해주세요.' }, { status: 400 });
      }
      const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: { password: true },
      });
      if (!user?.password) {
        return NextResponse.json({ error: '비밀번호가 설정되지 않은 계정입니다.' }, { status: 400 });
      }
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        return NextResponse.json({ error: '현재 비밀번호가 일치하지 않습니다.' }, { status: 400 });
      }
      updateData.password = bcrypt.hashSync(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: '수정할 내용이 없습니다.' }, { status: 400 });
    }

    // select: { id: true } 로 avatarUrl SELECT 회피 (컬럼 미존재 시 오류 방지)
    await prisma.user.update({
      where: { id: session.id },
      data: updateData,
      select: { id: true },
    });
    return NextResponse.json({ success: true, message: '프로필이 업데이트되었습니다.' });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: '이미 사용 중인 이메일 또는 전화번호입니다.' }, { status: 409 });
    }
    console.error('프로필 업데이트 실패:', err);
    return NextResponse.json({ error: '프로필 업데이트에 실패했습니다.' }, { status: 500 });
  }
}
