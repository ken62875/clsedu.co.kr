import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SolapiMessageService } from "solapi";

// 개발 환경 등에서 Solapi 키가 없을 때를 대비한 Mock 처리 
const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY || "dummy_key";
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET || "dummy_secret";
const SOLAPI_SENDER_NUMBER = process.env.SOLAPI_SENDER_NUMBER || "01000000000";

let messageService: SolapiMessageService | null = null;
if (process.env.SOLAPI_API_KEY && process.env.SOLAPI_API_SECRET) {
  try {
    messageService = new SolapiMessageService(SOLAPI_API_KEY, SOLAPI_API_SECRET);
  } catch (e) {
    console.error("Solapi SDK 초기화 실패:", e);
  }
}

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 랜덤
}

export async function POST(request: Request) {
  try {
    const { contactMethod, contactValue } = await request.json();
    const phone = contactValue; // 연락처로 핸드폰 번호 사용

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: '휴대폰 번호가 필요합니다.' }, { status: 400 });
    }

    // 하이픈 제거
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: cleanPhone }, // 하이픈 없는 번호
          { phone: phone } // 하이픈 있는 포맷
        ]
      }
    });

    if (!user) {
      return NextResponse.json({ error: '해당 휴대폰 번호로 등록된 학생 정보가 없습니다.' }, { status: 404 });
    }

    const code = generateRandomCode();
    
    // 기존에 있던 인증번호는 삭제 (혹은 덮어쓰기)
    await prisma.phoneVerificationToken.deleteMany({
      where: { phone: cleanPhone }
    });

    // 3분 만료 토큰 생성
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 3);

    await prisma.phoneVerificationToken.create({
      data: {
        phone: cleanPhone,
        token: code,
        expiresAt
      }
    });

    if (messageService) {
      await messageService.sendOne({
        to: cleanPhone,
        from: SOLAPI_SENDER_NUMBER,
        text: `[CLS에듀케이션] 인증번호는 [${code}] 입니다.`
      });
    } else {
      console.log(`[개발환경 SMS 모의 발송] 대상:${cleanPhone}, 인증번호:${code}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: '인증번호가 휴대폰으로 전송되었습니다.'
    });

  } catch (error: any) {
    console.error("SMS 발송 에러:", error);
    return NextResponse.json({ 
      error: 'Server Error',
      details: error?.message || String(error)
    }, { status: 500 });
  }
}

