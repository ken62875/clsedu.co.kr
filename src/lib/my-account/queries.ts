import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// React.cache() 로 동일 request 내 중복 DB 조회를 제거합니다.
// layout + page 에서 각자 호출해도 한 번만 실행됩니다.

export const getMyAccountUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  try {
    const fresh = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true },
    });
    if (fresh) return { ...fresh, role: fresh.role?.toLowerCase() ?? session.role };
  } catch (err) {
    if ((err as { code?: string })?.code !== 'P2022') throw err;
    // avatar_url 컬럼 미존재 시 제외하고 재조회
    const fresh = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
    if (fresh) return { ...fresh, avatarUrl: null, role: fresh.role?.toLowerCase() ?? session.role };
  }
  return { id: session.id, name: session.name, email: session.email, role: session.role, phone: undefined, avatarUrl: session.avatarUrl ?? null };
});

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function floatToTimeStr(t: number): string {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export const getDashboardData = cache(async (userId: string) => {
  const todayDay = DAYS[new Date().getDay()];
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [activeClassCount, enrollments, latestPayment, notices] = await Promise.all([
    prisma.courseClassStudent.count({
      where: { studentId: userId, class: { isActive: true } },
    }),
    prisma.courseClassStudent.findMany({
      where: { studentId: userId, class: { isActive: true } },
      include: {
        class: {
          include: {
            schedules: { where: { dayOfWeek: todayDay }, orderBy: { startTime: 'asc' } },
            teachers: { include: { teacher: { select: { name: true } } } },
          },
        },
      },
    }),
    prisma.payment.findFirst({
      where: { userId },
      orderBy: { paymentDate: 'desc' },
      select: { amount: true, status: true, paymentDate: true },
    }),
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, publishedAt: true, slug: true },
    }),
  ]);

  const todaySchedules = enrollments
    .flatMap((e) =>
      e.class.schedules.map((s) => ({
        id: s.id,
        className: e.class.name,
        teachers: e.class.teachers.map((t) => t.teacher.name).join(', '),
        startTime: s.startTime,
        startTimeStr: floatToTimeStr(s.startTime),
        duration: s.duration,
        color: e.class.color,
      }))
    )
    .sort((a, b) => a.startTime - b.startTime);

  return {
    activeClassCount,
    todaySchedules,
    latestPayment,
    thisMonthPaid: latestPayment
      ? new Date(latestPayment.paymentDate) >= thisMonthStart
      : false,
    notices,
  };
});

export const getMyClasses = cache(async (userId: string) => {
  return prisma.courseClassStudent.findMany({
    where: { studentId: userId },
    include: {
      class: {
        include: {
          schedules: { orderBy: { startTime: 'asc' } },
          teachers: { include: { teacher: { select: { id: true, name: true } } } },
        },
      },
    },
    orderBy: { enrolledAt: 'desc' },
  });
});

export type NotificationItem = {
  id: string;
  isRead: boolean;
  notification: {
    id: string;
    title: string;
    contentHtml: string | null;
    publishedAt: Date | null;
    createdAt: Date;
    author: { id: string; name: string };
    class: { id: string; name: string };
  };
};

export const getMyNotifications = cache(
  async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [rows, countRows] = await Promise.all([
      prisma.$queryRaw<
        {
          id: string;
          isRead: boolean;
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
        WHERE nr.user_id = ${userId}
          AND n.status::text = 'PUBLISHED'
        ORDER BY COALESCE(n.published_at, n.created_at) DESC
        LIMIT ${limit} OFFSET ${skip}
      `,
      prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) AS count
        FROM notification_recipients nr
        JOIN notifications n ON nr.notification_id = n.id
        WHERE nr.user_id = ${userId}
          AND n.status::text = 'PUBLISHED'
      `,
    ]);

    const items: NotificationItem[] = rows.map((r) => ({
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

    return { items, total: Number(countRows[0]?.count ?? 0) };
  }
);

export const getMyPayments = cache(
  async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [rows, total] = await Promise.all([
      prisma.payment.findMany({
        where: { userId },
        orderBy: { paymentDate: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          amount: true,
          method: true,
          status: true,
          paymentDate: true,
        },
      }),
      prisma.payment.count({ where: { userId } }),
    ]);
    return { payments: rows, total };
  }
);
