import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadToR2 } from '@/lib/r2';
import { requireAuth } from '@/lib/auth';
import { encodeSession, sessionCookie } from '@/lib/session';
import { serverError } from '@/lib/api';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'JPG, PNG, WebP, GIF 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `avatar-${session.id}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const avatarUrl = await uploadToR2(buffer, fileName, 'avatars', file.type);

    await prisma.user.update({
      where: { id: session.id },
      data: { avatarUrl },
      select: { id: true },
    });

    // 세션 쿠키에 avatarUrl 반영 (서명 재계산)
    const updatedSession = { ...session, avatarUrl };
    const response = NextResponse.json({ success: true, avatarUrl });
    response.cookies.set(
      sessionCookie.name,
      encodeSession(updatedSession),
      sessionCookie.options
    );
    return response;
  } catch (err) {
    if (err instanceof Error && err.message?.includes('R2 환경 변수')) {
      return NextResponse.json(
        { error: 'R2 스토리지가 설정되지 않았습니다. 관리자에게 문의하세요.' },
        { status: 500 }
      );
    }
    return serverError('아바타 업로드에 실패했습니다.', err);
  }
}
