import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  // Basic 인증 헤더가 존재하는 경우
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // 사용자가 요청한 비밀번호 'clsedu.1245' 확인 (ID는 아무거나 입력해도 통과되도록 처리)
    if (pwd === 'clsedu.1245' || (user === 'admin' && pwd === 'clsedu.1245')) {
      return NextResponse.next();
    }
  }

  // 인증이 없거나 실패한 경우 401 Unauthorized 반환하여 브라우저의 기본 로그인 창을 띄움
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청에 미들웨어 적용:
     * - api (API routes)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico, sitemap.xml, robots.txt (메타데이터 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
