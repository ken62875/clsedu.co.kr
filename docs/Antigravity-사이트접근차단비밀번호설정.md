# CLS 에듀케이션 웹사이트 접근 차단 (비밀번호 설정) 문서

## 1. 작업 개요
*   **목적**: 운영 서버에 배포된 목업 사이트에 일반 인터넷 사용자가 무단으로 접근하지 못하도록, 비밀번호(clsedu.1245) 기반의 전체 접근 차단을 설정합니다.
*   **적용 방식**: Next.js Edge Middleware와 브라우저 기본 지원 기능인 HTTP Basic Authentication 시스템을 조합하여 사용.

## 2. 세부 구현 사항 내역
*   **수정 파일**: `src/middleware.ts` (신규 생성)
*   **인증 로직 요약**:
    1.  사용자가 웹사이트에 접속하면 Middleware가 가로채어 `authorization` HTTP 헤더가 있는지 확인합니다.
    2.  인증 정보가 없다면 브라우저에게 `WWW-Authenticate: Basic` 헤더를 포함한 `401 Unauthorized` 팝업을 즉시 띄웁니다.
    3.  사용자가 브라우저 팝업창에서 데이터를 입력하면 base64 디코딩 후 비밀번호가 `clsedu.1245`인지 검증합니다.
    4.  성공 시 Next.js 페이지 렌더링 영역(`NextResponse.next()`)으로 통과시키며, 오류 시 계속해서 팝업에서 비밀번호를 요구합니다.
*   **사용자 입력 안내**:
    *   **ID**: 아무 문자(예: `admin`)나 입력해도 무방
    *   **비밀번호**: `clsedu.1245`

## 3. GitHub 자동 배포(Commit & Push) 절차
Coolify 서버에 해당 차단 로직을 반영하기 위해서 아래 명령을 터미널에서 실행해야 합니다.
```bash
git add src/middleware.ts
git commit -m "feat: 외부 접근 차단을 위한 Basic Authentication (비밀번호) 미들웨어 추가"
git push origin main
```
