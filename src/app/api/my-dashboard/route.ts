import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function floatToTimeStr(t: number): string {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('cls_session')?.value;

  if (!sessionData) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  let session: { id: string; name: string; role: string };
  try {
    session = JSON.parse(sessionData);
  } catch {
    return NextResponse.json({ error: '세션이 유효하지 않습니다.' }, { status: 401 });
  }

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
      latestPayment: latestPayment
        ? {
            amount: latestPayment.amount,
            status: latestPayment.status,
            paymentDate: latestPayment.paymentDate,
            remarks: latestPayment.remarks,
          }
        : null,
      thisMonthPaid,
      notices,
    });
  } catch (err) {
    console.error('대시보드 데이터 조회 실패:', err);
    return NextResponse.json({ error: '데이터를 불러오는 데 실패했습니다.' }, { status: 500 });
  }
}
