# 마이페이지 및 헤더 보안·성능 개선

- **작업 범위**: `clsedu.co.kr` 앱의 로그인 이후 헤더·마이페이지(`/my-account/**`) 영역과 인증 API 전반
- **작업 일자**: 2026-04-19
- **목적**: 보안 취약점 제거, 중복 코드 정리, 성능/캐싱 최적화, 타입 안전성 강화

---

## 1. 개선 요약

| 분류 | 개선 내용 |
| --- | --- |
| **보안** | 세션 쿠키 HMAC-SHA256 서명, 쿠키 만료 365일→7일, Base64 토큰 → crypto 랜덤 토큰 + DB, DOMPurify 기반 HTML sanitize, `debugDetail` 프로덕션 제외, 입력값 정규식 검증, User Enumeration 방지 |
| **구조** | API 라우트 인증 로직 공통화(`lib/auth.ts`), 마이페이지 레이아웃 서버 컴포넌트화, 사이드바 분리 |
| **성능** | DB 최신 사용자 정보로 아바타/이름 반영, AuthProvider 중복 요청 억제(in-flight ref), 페이로드 슬림화(민감 필드 제거) |
| **기능** | 결제 내역 실제 DB 연동(`/api/my-payments`), 페이지네이션, 상태 라벨링 |
| **타입** | `ignoreBuildErrors: true` → `false` 전환, `any` 제거, `tsc --noEmit` 통과 |

---

## 2. 주요 변경 파일

### 신규 추가
- [src/lib/session.ts](../src/lib/session.ts) — HMAC 서명 세션 쿠키 인코딩/디코딩, `SESSION_SECRET` 검증
- [src/lib/auth.ts](../src/lib/auth.ts) — `getSession()`, `requireAuth()`, `requireRole()`
- [src/lib/validation.ts](../src/lib/validation.ts) — 이메일·전화·비밀번호 검증 공통 룰
- [src/lib/sanitize.ts](../src/lib/sanitize.ts) — `isomorphic-dompurify` 기반 HTML sanitizer
- [src/lib/api.ts](../src/lib/api.ts) — 환경 분기 `serverError()` 응답 헬퍼
- [src/app/api/my-payments/route.ts](../src/app/api/my-payments/route.ts) — 결제 내역 API
- [src/components/my-account/Sidebar.tsx](../src/components/my-account/Sidebar.tsx) — 사이드바 클라이언트 컴포넌트
- [.env.example](../.env.example) — 환경변수 템플릿

### 수정
- [src/app/api/auth/login/route.ts](../src/app/api/auth/login/route.ts)
- [src/app/api/auth/me/route.ts](../src/app/api/auth/me/route.ts)
- [src/app/api/auth/verify-code/route.ts](../src/app/api/auth/verify-code/route.ts)
- [src/app/api/auth/set-password/route.ts](../src/app/api/auth/set-password/route.ts)
- [src/app/api/auth/reset-password/route.ts](../src/app/api/auth/reset-password/route.ts)
- [src/app/api/auth/forgot-password/route.ts](../src/app/api/auth/forgot-password/route.ts)
- [src/app/api/my-dashboard/route.ts](../src/app/api/my-dashboard/route.ts)
- [src/app/api/my-classes/route.ts](../src/app/api/my-classes/route.ts)
- [src/app/api/my-notifications/route.ts](../src/app/api/my-notifications/route.ts)
- [src/app/api/profile/route.ts](../src/app/api/profile/route.ts)
- [src/app/api/profile/avatar/route.ts](../src/app/api/profile/avatar/route.ts)
- [src/app/my-account/layout.tsx](../src/app/my-account/layout.tsx) — 서버 컴포넌트 전환
- [src/app/my-account/payment/page.tsx](../src/app/my-account/payment/page.tsx) — 실제 API 연동
- [src/app/my-account/notification/page.tsx](../src/app/my-account/notification/page.tsx) — sanitize 적용
- [src/app/about/page.tsx](../src/app/about/page.tsx) — sanitize 적용
- [src/app/story/[id]/page.tsx](../src/app/story/%5Bid%5D/page.tsx) — sanitize 적용
- [src/providers/AuthProvider.tsx](../src/providers/AuthProvider.tsx) — 중복 호출 억제
- [next.config.ts](../next.config.ts) — `ignoreBuildErrors: false`

---

## 3. 상세 설명

### 3.1 세션 쿠키 서명 (`src/lib/session.ts`)

기존 쿠키는 `JSON.stringify(user)` 평문이었습니다. httpOnly 쿠키라 브라우저 JS 에서는 건드릴 수 없지만, 중간 경로에서 수정된 쿠키를 서버가 그대로 신뢰하는 구조였습니다. 이제 다음을 적용합니다.

- **HMAC-SHA256 서명**: 페이로드와 서명을 `.` 로 구분해 저장(`<body>.<signature>`)
- **상수 시간 비교**: `crypto.timingSafeEqual` 로 타이밍 공격 방지
- **`SESSION_SECRET` 강제**: 32자 미만이면 서버 시작 시 예외
- **쿠키 만료 7일**: 기존 365일 → 7일 (세션 하이재킹 범위 축소)

> **배포 시 필요**: `.env` 에 `SESSION_SECRET` 추가 (32자 이상). 미설정 시 API 호출이 500 으로 실패합니다.
> 권장 생성: `openssl rand -base64 48`

### 3.2 API 인증 공통화 (`src/lib/auth.ts`)

기존에는 6개 API 라우트가 동일한 쿠키 파싱 로직을 복붙(약 200줄 중복)했습니다. 이제:

```ts
export async function GET() {
  const auth = await requireAuth();
  if (!auth.session) return auth.response;
  const { session } = auth;
  // ...
}
```

세 줄로 줄어들며, 쿠키 스펙이 바뀌면 한 곳만 수정하면 됩니다.

### 3.3 Base64 → Crypto 랜덤 토큰

기존 `verify-code` 는 `Buffer.from(user.id).toString('base64')` 를 그대로 `resetToken` 으로 반환했습니다. Base64 는 암호화가 아니므로 공격자가 임의의 다른 사용자 ID 로 `set-password` 를 호출할 수 있었습니다.

개선 후:

1. `crypto.randomBytes(32).toString('hex')` 로 추측 불가능한 토큰 생성
2. `PasswordResetToken` 테이블에 10분 만료로 저장
3. `set-password` 에서 DB 검증 후 사용 후 즉시 삭제(재사용 방지)

### 3.4 HTML Sanitize (XSS 방지)

`isomorphic-dompurify` 로 `<script>`, `on*` 이벤트 핸들러, 인라인 스타일 등을 화이트리스트 기반으로 제거합니다. 적용 위치:

- 알림장 본문
- 블로그 상세
- About 페이지(철학/약속 섹션)

### 3.5 결제 페이지 실제 연동

기존 `payment/page.tsx` 는 하드코딩 목업이었습니다. 이제 `/api/my-payments` 를 통해 DB 의 `Payment` 테이블에서 실제 내역을 조회하며, `remarks` 같은 내부 메모 필드는 응답에서 제외해 정보 노출을 차단합니다.

### 3.6 레이아웃 서버 컴포넌트화

`my-account/layout.tsx` 를 서버 컴포넌트로 전환해 인증 미통과 시 **클라이언트로 private UI 가 전송되지 않도록** 했습니다. DB 에서 `avatarUrl` 을 최신으로 조회해 프로필 이미지 동기화 지연도 제거했습니다.

### 3.7 입력 검증 강화

- 이메일: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- 전화번호: `/^01[0-9]-?\d{3,4}-?\d{4}$/` + 정규화
- 비밀번호: 8자 이상, 영문·숫자 조합

### 3.8 `debugDetail` 프로덕션 제외

`serverError()` 헬퍼가 `NODE_ENV !== 'production'` 일 때만 상세 오류를 포함합니다. 프로덕션 환경에서 시스템 경로·스택 트레이스가 응답에 섞여 나가던 이슈 해결.

### 3.9 User Enumeration 방지

`forgot-password`, `login` 에서 동일한 에러 메시지를 반환해 이메일이 존재하는지 여부가 에러 메시지로 누설되지 않도록 했습니다.

---

## 4. 배포 전 체크리스트

1. **`SESSION_SECRET` 환경변수 추가** (Coolify/Docker 환경): 32자 이상 랜덤 문자열
2. **기존 로그인 세션 무효화 안내**: 쿠키 서명 방식이 바뀌었으므로 모든 사용자 재로그인 필요
3. **검증 완료**:
   - `npx tsc --noEmit` ✅ 에러 0개
   - `npx next build` ✅ 빌드 성공 (40 페이지)
4. **남은 권장사항**(이번 범위 밖):
   - Next.js 16.2.4 업그레이드 (DoS 취약점 패치)
   - `<img>` → `next/image` 전환 (story 페이지)
   - 로그인 페이지 등 남은 `catch (err: any)` → `unknown` 전환

---

## 5. Git 반영 명령어

```bash
cd /Users/stanley/workspace/clsedu/clsedu.co.kr

git add \
  .env.example \
  next.config.ts \
  package.json package-lock.json \
  src/lib/session.ts \
  src/lib/auth.ts \
  src/lib/validation.ts \
  src/lib/sanitize.ts \
  src/lib/api.ts \
  src/providers/AuthProvider.tsx \
  src/components/my-account/Sidebar.tsx \
  src/app/my-account/layout.tsx \
  src/app/my-account/payment/page.tsx \
  src/app/my-account/notification/page.tsx \
  src/app/about/page.tsx \
  "src/app/story/[id]/page.tsx" \
  src/app/api/auth/login/route.ts \
  src/app/api/auth/me/route.ts \
  src/app/api/auth/verify-code/route.ts \
  src/app/api/auth/set-password/route.ts \
  src/app/api/auth/reset-password/route.ts \
  src/app/api/auth/forgot-password/route.ts \
  src/app/api/my-dashboard/route.ts \
  src/app/api/my-classes/route.ts \
  src/app/api/my-notifications/route.ts \
  src/app/api/my-payments/route.ts \
  src/app/api/profile/route.ts \
  src/app/api/profile/avatar/route.ts \
  "docs/Claude-마이페이지 및 헤더 보안 성능 개선.md"

git commit -m "refactor(auth): 세션 서명·XSS 방지·API 공통화로 마이페이지 보안/성능 강화

- 세션 쿠키 HMAC-SHA256 서명, 만료 365일→7일
- Base64 리셋 토큰 → crypto 랜덤 + DB 저장
- isomorphic-dompurify 로 알림장/블로그/About XSS 차단
- /api/my-* 라우트 인증 로직 lib/auth.ts 로 공통화
- 입력 검증(이메일/전화/비밀번호) lib/validation.ts 분리
- debugDetail 프로덕션 응답 제거
- /api/my-payments 신설 및 결제 페이지 실제 연동
- my-account 레이아웃 서버 컴포넌트화
- ignoreBuildErrors false 전환, tsc/next build 통과"

git push origin main
```

> **배포 후 확인**: 기존 사용자는 전원 재로그인이 필요하며, 로그인 API 호출 시 500 이 뜨면 `SESSION_SECRET` 환경변수가 반영되지 않은 것입니다.
