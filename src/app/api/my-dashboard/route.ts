import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { serverError } from '@/lib/api';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function floatToTimeStr(t: number): string {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export async function GET() {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  try {
    const todayDay = DAYS[new Date().getDay()];
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [activeClassCount, enrollments, latestPayment, notices] = await Promise.all([
      prisma.courseClassStudent.count({
        where: { studentId: session.id, class: { isActive: true } },
      }),
      prisma.courseClassStudent.findMany({
        where: { studentId: session.id, class: { isActive: true } },
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
        where: { userId: session.id },
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
      .flatMap(e =>
        e.class.schedules.map(s => ({
          id: s.id,
          className: e.class.name,
          teachers: e.class.teachers.map(t => t.teacher.name).join(', '),
          startTime: s.startTime,
          startTimeStr: floatToTimeStr(s.startTime),
          duration: s.duration,
          color: e.class.color,
        }))
      )
      .sort((a, b) => a.startTime - b.startTime);

    const thisMonthPaid = latestPayment
      ? new Date(latestPayment.paymentDate) >= thisMonthStart
      : false;

    return NextResponse.json({
      activeClassCount,
      todaySchedules,
      latestPayment,
      thisMonthPaid,
      notices,
    });
  } catch (err) {
    return serverError('대시보드 데이터를 불러오는 데 실패했습니다.', err);
  }
}
