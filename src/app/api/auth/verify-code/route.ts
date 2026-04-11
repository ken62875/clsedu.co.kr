import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { contactValue, code } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: contactValue }, { phone: contactValue }]
      }
    });

    if (!user) {
      return NextResponse.json({ error: '해당 사용자 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // 더미 인증번호 확인 로직
    if (code !== '123456') {
      return NextResponse.json({ error: '인증번호가 올바르지 않습니다.' }, { status: 401 });
    }

    // 간단한 인코딩을 통한 식별용 리셋 토큰 (실제 서비스에서는 JWT 권장)
    const resetToken = Buffer.from(user.id).toString('base64');

    return NextResponse.json({ 
      success: true, 
      resetToken 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
