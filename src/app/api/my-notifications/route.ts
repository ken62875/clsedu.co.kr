import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// GET /api/my-notifications - 로그인 사용자의 알림장 목록
// status 컬럼이 DB에서 PostgreSQL enum(NotificationStatus)이므로 $queryRaw 사용
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
    const rows: {
      id: string;
      isRead: boolean;
      readAt: Date | null;
      notificationId: string;
      title: string;
      contentHtml: string | null;
      publishedAt: Date | null;
      createdAt: Date;
      authorId: string;
      authorName: string;
      classId: string;
      className: string;
    }[] = await prisma.$queryRaw`
      SELECT
        nr.id,
        nr.is_read       AS "isRead",
        nr.read_at       AS "readAt",
        n.id             AS "notificationId",
        n.title,
        n.content_html   AS "contentHtml",
        n.published_at   AS "publishedAt",
        n.created_at     AS "createdAt",
        u.id             AS "authorId",
        u.name           AS "authorName",
        cc.id            AS "classId",
        cc.name          AS "className"
      FROM notification_recipients nr
      JOIN notifications n  ON nr.notification_id = n.id
      JOIN users u          ON n.author_id = u.id
      JOIN course_classes cc ON n.class_id = cc.id
      WHERE nr.user_id = ${user.id}
        AND n.status::text = 'PUBLISHED'
      ORDER BY COALESCE(n.published_at, n.created_at) DESC
      LIMIT ${limit} OFFSET ${skip}
    `;

    const countResult: { count: bigint }[] = await prisma.$queryRaw`
      SELECT COUNT(*) AS count
      FROM notification_recipients nr
      JOIN notifications n ON nr.notification_id = n.id
      WHERE nr.user_id = ${user.id}
        AND n.status::text = 'PUBLISHED'
    `;
    const total = Number(countResult[0]?.count ?? 0);

    const recipients = rows.map((r) => ({
      id: r.id,
      isRead: r.isRead,
      notification: {
        id: r.notificationId,
        title: r.title,
        contentHtml: r.contentHtml,
        publishedAt: r.publishedAt,
        createdAt: r.createdAt,
        author: { id: r.authorId, name: r.authorName },
        class: { id: r.classId, name: r.className },
      },
    }));

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

    await prisma.$executeRaw`
      UPDATE notification_recipients
      SET is_read = true, read_at = NOW()
      WHERE notification_id = ${notificationId}
        AND user_id = ${user.id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('읽음 처리 실패:', err);
    return NextResponse.json({ error: '처리에 실패했습니다.' }, { status: 500 });
  }
}
