import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { serverError } from '@/lib/api';

// GET /api/my-notifications - 로그인 사용자의 알림장 목록
// status 컬럼이 DB에서 PostgreSQL enum(NotificationStatus)이므로 $queryRaw 사용
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  const { searchParams } = new URL(req.url);
  const parsedPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const parsedLimit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const skip = (parsedPage - 1) * parsedLimit;

  try {
    const rows = await prisma.$queryRaw<
      {
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
      }[]
    >`
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
      WHERE nr.user_id = ${session.id}
        AND n.status::text = 'PUBLISHED'
      ORDER BY COALESCE(n.published_at, n.created_at) DESC
      LIMIT ${parsedLimit} OFFSET ${skip}
    `;

    const countResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) AS count
      FROM notification_recipients nr
      JOIN notifications n ON nr.notification_id = n.id
      WHERE nr.user_id = ${session.id}
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

    return NextResponse.json({ recipients, total, page: parsedPage, limit: parsedLimit });
  } catch (err) {
    return serverError('알림장을 불러오는 데 실패했습니다.', err);
  }
}

// PATCH /api/my-notifications - 읽음 처리
export async function PATCH(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  try {
    const { notificationId } = await req.json();
    if (!notificationId || typeof notificationId !== 'string') {
      return NextResponse.json({ error: '알림장 ID가 필요합니다.' }, { status: 400 });
    }

    await prisma.$executeRaw`
      UPDATE notification_recipients
      SET is_read = true, read_at = NOW()
      WHERE notification_id = ${notificationId}
        AND user_id = ${session.id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    return serverError('읽음 처리에 실패했습니다.', err);
  }
}
