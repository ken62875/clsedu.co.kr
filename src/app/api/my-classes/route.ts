import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { serverError } from '@/lib/api';

export async function GET() {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  try {
    const enrollments = await prisma.courseClassStudent.findMany({
      where: { studentId: session.id },
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
    return serverError('수업 정보를 불러오는 데 실패했습니다.', err);
  }
}
