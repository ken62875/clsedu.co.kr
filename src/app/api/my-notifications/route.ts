import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// GET /api/my-notifications - 로그인 사용자의 알림장 목록
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('cls_session')?.value;

  if (!sessionData) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  let user: { id: string; name: string; email: string; role: string };
  try {
    user = JSON.parse(sessionData);
  } catch {
    return NextResponse.json({ error: '세션이 유효하지 않습니다.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;

  try {
    const [recipients, total] = await Promise.all([
      prisma.notificationRecipient.findMany({
        where: {
          userId: user.id,
          notification: { status: 'PUBLISHED' },
        },
        skip,
        take: limit,
        orderBy: { notification: { publishedAt: 'desc' } },
        include: {
          notification: {
            include: {
              author: { select: { id: true, name: true } },
              class: { select: { id: true, name: true } },
            },
          },
        },
      }),
      prisma.notificationRecipient.count({
        where: {
          userId: user.id,
          notification: { status: 'PUBLISHED' },
        },
      }),
    ]);

    return NextResponse.json({ recipients, total, page, limit });
  } catch (err) {
    console.error('알림장 조회 실패:', err);
    return NextResponse.json({ error: '알림장을 불러오는 데 실패했습니다.' }, { status: 500 });
  }
}

// PATCH /api/my-notifications - 읽음 처리
export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('cls_session')?.value;

  if (!sessionData) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  let user: { id: string };
  try {
    user = JSON.parse(sessionData);
  } catch {
    return NextResponse.json({ error: '세션이 유효하지 않습니다.' }, { status: 401 });
  }

  try {
    const { notificationId } = await req.json();
    if (!notificationId) {
      return NextResponse.json({ error: '알림장 ID가 필요합니다.' }, { status: 400 });
    }

    await prisma.notificationRecipient.updateMany({
      where: { notificationId, userId: user.id },
      data: { isRead: true, readAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('읽음 처리 실패:', err);
    return NextResponse.json({ error: '처리에 실패했습니다.' }, { status: 500 });
  }
}
