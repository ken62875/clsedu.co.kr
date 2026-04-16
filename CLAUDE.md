# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 개발 명령어

```bash
npm run dev    # 개발 서버 실행 (포트 3000)
npm run build  # next build (standalone 출력)
npm run lint   # ESLint 검사

# DB 관련 (Prisma)
npm run db:push      # 스키마 변경 후 DB 동기화 (개발)
npm run db:generate  # Prisma 클라이언트 재생성
npm run db:migrate   # 마이그레이션 배포 (프로덕션)
npm run db:studio    # Prisma Studio (DB GUI)
```

> `npm run build`는 `next build`만 실행한다 — `prisma generate`는 Dockerfile에서 별도 실행하므로 중복 제거됨.

## 배포

**GitHub Push → Coolify 자동 감지 → Docker 빌드 및 배포**

- `Dockerfile`: 3-stage 빌드 (deps → builder → runner), `node:20-alpine`
- `.dockerignore`: 불필요한 파일 제외 (빌드 컨텍스트 최소화)
- `next.config.ts`에 `output: "standalone"` 설정 — Docker 최적화 필수

```bash
# 로컬 Docker 빌드 테스트
docker build -t clsedu-frontend .
docker run -p 3000:3000 clsedu-frontend
```

## 아키텍처

### 레이아웃 구조

`src/app/layout.tsx`가 전역 레이아웃이다. `Header`, `Footer`, `FloatingButton`, `MobileBottomNav`가 모든 페이지에 고정으로 포함된다. 본문에는 `pt-20 pb-16 md:pb-0`가 적용되어 있어 헤더/모바일 하단 탭 높이를 보정한다.

### 페이지 구조

```
src/app/
├── page.tsx                  # 메인 랜딩 (HeroSlider + CountupStats + 섹션들)
├── about/                    # 학원소개
├── curriculum/               # 교과과정 메인
│   ├── elementary-school/    # 초등부
│   ├── middle-school/        # 중등부
│   ├── high-school/          # 고등부
│   └── special-program/      # 특별 프로그램
├── program/                  # 프로그램
├── teachers/                 # 강사소개
├── story/                    # 블로그 목록 + [id] 상세 (백엔드 API 연동)
├── contact/                  # 상담 문의 (이메일 전송)
├── login/                    # 로그인 + forgot/reset/set-password
├── signup/                   # 회원가입
└── my-account/               # 학부모/학생 전용 마이페이지
    ├── dashboard/
    ├── class/
    ├── payment/
    ├── notification/
    └── profile/
```

### 메인 페이지 섹션 구성 (page.tsx)

```
HeroSlider         → 슬라이드 배너 (백엔드 API 연동)
CountupStats       → 통계 카운팅 (누적수강생·학생만족도·평균수강기간)
Philosophy Section → 3가지 교육 철학 카드
Programs Overview  → 초·중·고 프로그램 카드
Trust & Review     → 학부모 후기
Final CTA          → 상담 예약 버튼
```

### 컴포넌트

```
src/components/
├── layout/
│   ├── Header.tsx           # 상단 헤더 (반응형 네비게이션)
│   ├── Footer.tsx           # 하단 푸터
│   └── MobileBottomNav.tsx  # 모바일 하단 탭 네비게이션
└── ui/
    ├── HeroSlider.tsx        # 히어로 슬라이더 (자체 섹션 렌더링)
    ├── CountupStats.tsx      # 통계 카운팅 애니메이션 (3칼럼 고정)
    ├── FadeIn.tsx            # IntersectionObserver 기반 페이드인
    ├── FloatingButton.tsx    # 플로팅 상담 버튼
    └── Pagination.tsx        # 페이지네이션
```

### HeroSlider

`src/components/ui/HeroSlider.tsx`는 자체적으로 `<section>` 전체를 렌더링하는 클라이언트 컴포넌트다. `page.tsx`에서는 `<HeroSlider />`만 배치한다.

- `NEXT_PUBLIC_API_URL/api/hero-slides`에서 슬라이드 데이터 fetch (60초 캐시)
- `NEXT_PUBLIC_API_URL/api/hero-slides/settings`에서 전환 시간·효과·무작위 순서 설정 fetch
- API 실패 시 `media.clsedu.co.kr`의 기본 4장 이미지로 폴백
- 슬라이드에 `title`이 있으면 커스텀 텍스트 오버레이(z-20), 없으면 기본 브랜드 카피 표시

### CountupStats

`src/components/ui/CountupStats.tsx` — Hero 섹션 바로 아래 배치된 통계 섹션.

- IntersectionObserver로 화면 진입 시 애니메이션 시작 (threshold: 0.2)
- easeOutQuad 이징, 2.5초 카운트업
- 개별 카드 200ms 순차 지연
- 모바일·태블릿·데스크톱 모두 **3칼럼 고정** (`grid grid-cols-3`)
- 정수: `toLocaleString()` (천 단위 콤마), 소수: `toFixed(1)`

### 백엔드 API 연동

`NEXT_PUBLIC_API_URL` 환경 변수로 백엔드 주소를 지정한다.

```
# .env (개발)
NEXT_PUBLIC_API_URL=http://localhost:3001

# 프로덕션: https://app.clsedu.co.kr
```

**연동 중인 API:**
- `HeroSlider`: `/api/hero-slides`, `/api/hero-slides/settings`
- `story/` 블로그: `/api/blog/posts`
- `contact/` 상담 문의: `/api/contact` (자체 이메일 발송)

### 스타일링

Tailwind CSS v4. 커스텀 컬러 토큰(`cls-orange`, `cls-navy`, `cls-black` 등)은 `globals.css`에 정의되어 있다. 외부 이미지(`media.clsedu.co.kr`)는 `next.config.ts`의 `remotePatterns`에 등록되어 있으며, R2 직접 URL 이미지에는 `unoptimized` prop을 사용한다.

### 인증 (마이페이지)

`src/providers/AuthProvider.tsx`가 전역 인증 상태를 관리한다. `login/`, `signup/`, `my-account/` 페이지가 학부모·학생 대상 마이페이지 영역이다 (관리 대시보드 `app.clsedu.co.kr`과 완전히 별도).

## Prisma 모델 (주요)

```
User                   # 사용자
BlogPost               # 블로그 게시물
BlogCategory           # 블로그 카테고리
BlogTag                # 블로그 태그
BlogPostTag            # 블로그-태그 매핑
PasswordResetToken     # 비밀번호 재설정 토큰
PhoneVerificationToken # 전화번호 인증 토큰
```

## 환경 변수

```
DATABASE_URL           # PostgreSQL 연결 문자열
NEXT_PUBLIC_API_URL    # 백엔드 URL (http://localhost:3001 또는 https://app.clsedu.co.kr)
SOLAPI_API_KEY         # SolAPI 문자메시지
SOLAPI_API_SECRET
SOLAPI_SENDER_NUMBER
```
