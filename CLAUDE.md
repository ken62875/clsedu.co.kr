# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 개발 명령어

```bash
npm run dev    # 개발 서버 실행 (포트 3000)
npm run build  # next build
npm run lint   # ESLint 검사
```

## 아키텍처

### 레이아웃 구조

`src/app/layout.tsx`가 전역 레이아웃이다. `Header`, `Footer`, `FloatingButton`, `MobileBottomNav`가 모든 페이지에 고정으로 포함된다. 본문에는 `pt-20 pb-16 md:pb-0`가 적용되어 있어 헤더/모바일 하단 탭 높이를 보정한다.

### 페이지 구조

```
src/app/
├── page.tsx          # 메인 랜딩 (HeroSlider는 자체적으로 섹션 전체를 렌더링)
├── about/            # 학원소개
├── curriculum/       # 교과과정 (초·중·고 탭)
├── program/          # 프로그램
├── teachers/         # 강사소개
├── story/            # 블로그 목록 + [slug] 상세 (백엔드 API 연동)
├── contact/          # 상담 문의 (이메일 전송)
├── login/ signup/    # 마이페이지 인증
└── my-account/       # 학부모/학생 전용 마이페이지
```

### HeroSlider

`src/components/ui/HeroSlider.tsx`는 자체적으로 `<section>` 전체를 렌더링하는 클라이언트 컴포넌트다. `page.tsx`에서는 `<HeroSlider />`만 배치한다.

- `NEXT_PUBLIC_API_URL/api/hero-slides`에서 슬라이드 데이터 fetch (60초 캐시)
- `NEXT_PUBLIC_API_URL/api/hero-slides/settings`에서 전환 시간·효과·무작위 순서 설정 fetch
- API 실패 시 `media.clsedu.co.kr`의 기본 4장 이미지로 폴백
- 슬라이드에 `title`이 있으면 커스텀 텍스트 오버레이(z-20), 없으면 기본 브랜드 카피 표시

### 백엔드 API 연동

`NEXT_PUBLIC_API_URL` 환경 변수로 백엔드 주소를 지정한다.

```
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001   # 개발
NEXT_PUBLIC_API_URL=https://app.clsedu.co.kr  # 프로덕션
```

현재 API 연동 페이지: `story/` (블로그 목록·상세), `HeroSlider` (슬라이드)

### 스타일링

Tailwind CSS v4. 커스텀 컬러 토큰(`cls-orange`, `cls-navy`, `cls-black` 등)은 `globals.css`에 정의되어 있다. 외부 이미지(`media.clsedu.co.kr`)는 `next.config.ts`의 `remotePatterns`에 등록되어 있으며, R2 직접 URL 이미지에는 `unoptimized` prop을 사용한다.

### 인증 (마이페이지)

`src/providers/AuthProvider.tsx`가 전역 인증 상태를 관리한다. `login/`, `signup/`, `my-account/` 페이지가 학부모·학생 대상 마이페이지 영역이다 (관리 대시보드와 별도).
