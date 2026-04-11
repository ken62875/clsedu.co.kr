import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { contactMethod, contactValue } = await request.json();

    if (!contactValue) {
      return NextResponse.json({ error: '연락처 정보가 필요합니다.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: contactValue }, { phone: contactValue }]
      }
    });

    if (!user) {
      return NextResponse.json({ error: '가입된 사용자 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    // 성공적으로 발송되었음을 가정
    return NextResponse.json({ 
      success: true, 
      message: `인증번호가 전송되었습니다. (더미 인증번호: 123456)`
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
