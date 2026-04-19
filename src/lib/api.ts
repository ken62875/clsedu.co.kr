import { NextResponse } from 'next/server';

const isDev = process.env.NODE_ENV !== 'production';

// 개발 환경에서만 debugDetail 을 포함하는 표준 500 응답.
// 프로덕션에서는 내부 정보가 노출되지 않도록 메시지만 반환합니다.
export function serverError(message: string, error?: unknown): NextResponse {
  if (isDev && error) {
    console.error(message, error);
  } else {
    console.error(message);
  }
  return NextResponse.json(
    {
      error: message,
      ...(isDev && error
        ? { debugDetail: error instanceof Error ? error.message : String(error) }
        : {}),
    },
    { status: 500 }
  );
}
