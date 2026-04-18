import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { uploadToR2 } from '@/lib/r2';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('cls_session')?.value;
  if (!sessionData) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

  let session: { id: string; name: string; email: string; role: string };
  try {
    session = JSON.parse(sessionData);
  } catch {
    return NextResponse.json({ error: '세션이 유효하지 않습니다.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'JPG, PNG, WebP, GIF 파일만 업로드 가능합니다.' }, { status: 400 });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `avatar-${session.id}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const avatarUrl = await uploadToR2(buffer, fileName, 'avatars', file.type);

    await prisma.user.update({ where: { id: session.id }, data: { avatarUrl } });

    // 세션 쿠키에 avatarUrl 반영
    const updatedSession = { ...session, avatarUrl };
    const response = NextResponse.json({ success: true, avatarUrl });
    response.cookies.set('cls_session', JSON.stringify(updatedSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch (err: any) {
    console.error('아바타 업로드 실패:', err);
    const msg = err.message?.includes('R2 환경 변수')
      ? 'R2 스토리지가 설정되지 않았습니다. 관리자에게 문의하세요.'
      : '아바타 업로드에 실패했습니다.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
