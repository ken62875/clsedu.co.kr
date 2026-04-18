import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
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

  try {
    const enrollments = await prisma.courseClassStudent.findMany({
      where: { studentId: user.id },
      include: {
        class: {
          include: {
            schedules: { orderBy: { startTime: 'asc' } },
            teachers: {
              include: {
                teacher: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    return NextResponse.json({ enrollments });
  } catch (err) {
    console.error('수업 조회 실패:', err);
    return NextResponse.json({ error: '수업 정보를 불러오는 데 실패했습니다.' }, { status: 500 });
  }
}
