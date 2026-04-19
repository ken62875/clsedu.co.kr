# 마이페이지 네비게이션 성능 최적화

- **작업 범위**: `/my-account/**` 5개 페이지 렌더링 파이프라인 전면 재구성
- **작업 일자**: 2026-04-19
- **목표**: 페이지 이동 시 "빈 화면 → 스피너 → 데이터" 지연 제거, 체감 즉시성 확보

---

## 1. 렌더링 전략 변경

### Before (클라이언트 fetch)
```
[클릭] → [빈 페이지 전송] → [JS 로드] → [useEffect 실행] → [fetch] → [렌더]
```
→ 매 이동마다 수백 ms 의 빈 화면 + 스피너

### After (서버 스트리밍 + React.cache)
```
[클릭] → [서버가 HTML 에 데이터 포함해 스트림] → [즉시 렌더]
         ↳ layout 에서 시작한 DB 조회는 React.cache 로 page 에서 재사용
```
→ loading.tsx 스켈레톤이 0ms 노출, 실제 데이터는 서버 라운드트립 1회만

---

## 2. 주요 변경

### 신규 파일
- [src/lib/my-account/queries.ts](../src/lib/my-account/queries.ts) — `React.cache()` 로 감싼 DB 조회 5종
  - `getMyAccountUser`, `getDashboardData`, `getMyClasses`, `getMyNotifications`, `getMyPayments`
- [src/components/my-account/Skeletons.tsx](../src/components/my-account/Skeletons.tsx) — 재사용 스켈레톤 4종
- [src/components/my-account/NotificationList.tsx](../src/components/my-account/NotificationList.tsx) — 알림 클릭·낙관적 업데이트만 담당하는 Client Component
- [src/components/my-account/ProfileForm.tsx](../src/components/my-account/ProfileForm.tsx) — 서버에서 받은 initial 데이터로 렌더되는 편집 폼
- [src/components/my-account/PaymentPagination.tsx](../src/components/my-account/PaymentPagination.tsx) — `<Link prefetch>` 페이지네이션
- `loading.tsx` × 5 — dashboard/class/notification/payment/profile

### 수정 파일
- [src/app/my-account/layout.tsx](../src/app/my-account/layout.tsx) — `getMyAccountUser()` 사용, `React.cache` 활용
- [src/app/my-account/dashboard/page.tsx](../src/app/my-account/dashboard/page.tsx) — **Server Component**, 312→141 줄
- [src/app/my-account/class/page.tsx](../src/app/my-account/class/page.tsx) — **Server Component**
- [src/app/my-account/notification/page.tsx](../src/app/my-account/notification/page.tsx) — **Server Component**(데이터) + Client(토글)
- [src/app/my-account/payment/page.tsx](../src/app/my-account/payment/page.tsx) — **Server Component**, `cache: "no-store"` 제거
- [src/app/my-account/profile/page.tsx](../src/app/my-account/profile/page.tsx) — **Server**(initial) + Client(폼)

---

## 3. 핵심 기법

### 3.1 `React.cache()` — request-level 중복 제거

```ts
export const getMyAccountUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  return prisma.user.findUnique({ where: { id: session.id }, ... });
});
```

`layout.tsx` 와 `page.tsx` 가 같은 request 안에서 각자 호출해도 DB 는 단 한 번만 질의됩니다. 별도 Context 나 prop drilling 불필요.

### 3.2 Server Component 직접 DB 조회

API 라우트를 거치지 않고 서버 컴포넌트에서 `prisma` 를 직접 호출 → HTTP 왕복 1회 제거. HTML에 데이터가 이미 포함되므로 브라우저는 추가 fetch 없이 즉시 페인트 가능.

### 3.3 loading.tsx 로 Suspense fallback 자동화

Next.js App Router 가 각 세그먼트의 `loading.tsx` 를 자동으로 `<Suspense fallback>` 으로 감쌉니다. 페이지 이동 시 서버가 응답을 준비하는 순간부터 스켈레톤이 즉시 노출됩니다.

### 3.4 낙관적 업데이트 (Optimistic UI)

알림 읽음 처리는 서버 응답 없이 UI 먼저 갱신, 실패 시 롤백:

```ts
setItems(prev => prev.map(i => i.id === id ? { ...i, isRead: true } : i));
try { await fetch(...) } catch { /* 롤백 */ }
```

### 3.5 `<Link prefetch>` 페이지네이션

결제 내역 이전/다음 버튼을 `<Link prefetch>` 로 교체 → 마우스 hover 시 다음 페이지 데이터를 미리 받아둠.

### 3.6 불필요한 Client 경계 제거

| 페이지 | Before | After |
| --- | --- | --- |
| dashboard | 전체 `"use client"` | 100% Server |
| class | 전체 `"use client"` | 100% Server |
| payment | 전체 `"use client"` | 100% Server |
| notification | 전체 `"use client"` | Server(데이터) + Client(토글 only) |
| profile | 전체 `"use client"` | Server(initial) + Client(폼) |

→ JavaScript 번들이 수십 KB 감소, 첫 페인트 더 빨라짐.

---

## 4. 예상 체감 차이

| 시나리오 | Before | After |
| --- | --- | --- |
| 헤더 → 대시보드 첫 진입 | 빈 페이지 → JS → fetch(~300ms) → 렌더 | 즉시 스켈레톤 → 서버 응답과 함께 콘텐츠 |
| 대시보드 → 나의 수업 | 빈 탭 → 스피너 → 데이터 | 스켈레톤 0ms → 즉시 데이터 |
| 알림 클릭 후 돌아오기 | 다시 전체 재로딩 | React.cache 덕에 DB 조회 생략 가능 |
| 읽음 처리 | 네트워크 응답 대기 후 UI 갱신 | 즉시 UI 갱신(낙관적) |

---

## 5. 검증

- `tsc --noEmit` ✅ 0 에러
- `next build` ✅ 40 페이지 정상 빌드
- 마이페이지 5개 모두 `ƒ (Dynamic)` 로 표시 — 요청마다 최신 데이터 스트림

---

## 6. Git 반영 명령어

```bash
cd /Users/stanley/workspace/clsedu/clsedu.co.kr

git add \
  src/lib/my-account/queries.ts \
  src/components/my-account/Skeletons.tsx \
  src/components/my-account/NotificationList.tsx \
  src/components/my-account/ProfileForm.tsx \
  src/components/my-account/PaymentPagination.tsx \
  src/app/my-account/layout.tsx \
  src/app/my-account/dashboard/page.tsx \
  src/app/my-account/dashboard/loading.tsx \
  src/app/my-account/class/page.tsx \
  src/app/my-account/class/loading.tsx \
  src/app/my-account/notification/page.tsx \
  src/app/my-account/notification/loading.tsx \
  src/app/my-account/payment/page.tsx \
  src/app/my-account/payment/loading.tsx \
  src/app/my-account/profile/page.tsx \
  src/app/my-account/profile/loading.tsx \
  "docs/Claude-마이페이지 네비게이션 성능 최적화.md"

git commit -m "perf(my-account): Server Component 전환 + React.cache + loading.tsx 로 페이지 이동 즉시성 확보

- dashboard/class/payment 전체 Server Component 화
- notification/profile 은 Server(initial) + Client(상호작용) 분리
- React.cache 로 layout+page DB 조회 dedupe
- loading.tsx 5개 추가 (스켈레톤 즉시 노출)
- 알림 읽음 처리 낙관적 업데이트
- 결제 페이지 <Link prefetch> 페이지네이션
- 기존 클라이언트 fetch 코드 ~800줄 제거"

git push origin main
```

---

## 7. 남은 추가 최적화 여지

- **`next/dynamic`** 으로 알림 펼침 시에만 `isomorphic-dompurify` 로드 (현재는 NotificationList 진입 즉시 로드)
- **`Cache-Control` 헤더** 를 `/api/my-*` 응답에 짧게 추가해 연속 뒤로가기 시 브라우저 캐시 재활용
- **`next/image` 로 아바타 전환** — 현재 `unoptimized` 로 원본 그대로 전송
- **Streaming RSC + `<Suspense>` 세분화** — 대시보드를 위젯 단위로 Suspense 경계 분리하면 느린 쿼리가 있어도 나머지가 먼저 표시됨
