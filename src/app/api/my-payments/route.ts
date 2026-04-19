import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { serverError } from '@/lib/api';

// GET /api/my-payments - 로그인 사용자의 결제 내역
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const skip = (page - 1) * limit;

  try {
    const [rows, total] = await Promise.all([
      prisma.payment.findMany({
        where: { userId: session.id },
        orderBy: { paymentDate: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          amount: true,
          method: true,
          status: true,
          paymentDate: true,
          // remarks 는 내부 메모일 수 있어 노출하지 않습니다.
        },
      }),
      prisma.payment.count({ where: { userId: session.id } }),
    ]);

    return NextResponse.json({ payments: rows, total, page, limit });
  } catch (err) {
    return serverError('결제 내역을 불러오는 데 실패했습니다.', err);
  }
}
