# Hero 섹션 아래 통계 섹션 추가 - 숫자 카운트업 애니메이션

## 작업 개요
메인 랜딩페이지의 Hero 섹션 바로 아래에 학원의 주요 통계를 시각적으로 표현하는 섹션을 추가했습니다.

## 구현 내용

### 1. 통계 데이터
세 가지 주요 통계를 표시합니다:
- **누적수강생**: 15,000+
- **학생만족도**: 98.8%
- **평균 수강기간**: 5Year

### 2. 컴포넌트 구조

#### `CountupStats.tsx` (Main Container)
- 부모 컴포넌트로서 전체 섹션을 관리
- Intersection Observer로 화면 진입 감지
- `isVisible` 상태를 자식 카드로 전달

#### `StatCard` (Individual Card)
- 개별 통계 카드 컴포넌트
- 숫자 카운트업 애니메이션 구현
- 라벨과 접미사(suffix) 표시

### 3. 애니메이션 기술

**카운트업 애니메이션 (Countup Animation)**
- 기간: 2.5초 (`duration = 2500ms`)
- 이징: easeOutQuad (부드러운 감속)
- 수식: `easeProgress = 1 - (1 - progress)²`
- 순차 지연: 각 카드별로 200ms씩 지연
  - 첫 번째: 0ms (즉시 시작)
  - 두 번째: 200ms
  - 세 번째: 400ms

**Intersection Observer**
- 뷰포트에 섹션이 보일 때만 애니메이션 시작
- `threshold: 0.2` (20% 보임 시 트리거)
- 한 번만 실행되도록 `observer.unobserve()` 처리

### 4. 숫자 포맷팅
- **정수값** (15000, 5): `toLocaleString()` 사용 (천 단위 콤마)
- **소수값** (98.8): `toFixed(1)` 사용 (소수점 1자리)

### 5. 스타일링
- 배경: 연한 회색 (`bg-slate-50`)
- 패딩: 수직 `py-16`, 수평 `px-4`
- 텍스트 크기: 데스크톱 `text-6xl`, 모바일 `text-5xl`
- 색상: CLS 오렌지 (`text-cls-orange`)
- 레이아웃: 반응형 그리드 (`md:grid-cols-3`)

## 파일 변경사항

### 신규 파일
- `src/components/ui/CountupStats.tsx` (123줄)

### 수정 파일
- `src/app/page.tsx`
  - Import 추가: `import CountupStats from "@/components/ui/CountupStats";`
  - Hero 섹션 바로 아래 컴포넌트 추가

## 커밋 정보
- **커밋 해시**: 2737adc
- **커밋 메시지**: feat: Hero 섹션 아래 통계 섹션 추가 - 숫자 카운트업 애니메이션
- **변경 파일**: 2개 (create 1, modify 1)
- **추가 줄**: 125줄

## 테스트 결과

### 애니메이션 동작
✅ 화면 스크롤 시 섹션이 보일 때 애니메이션 시작
✅ 카운트업이 부드럽게 진행됨 (easeOutQuad 이징)
✅ 각 카드가 순차적으로 애니메이션 시작 (200ms 지연)

### 숫자 표현
✅ 15,000+ (천 단위 콤마 포함)
✅ 98.8% (소수점 정확히 1자리)
✅ 5Year (정수)

### 반응형 디자인
✅ 데스크톱: 3열 그리드
✅ 모바일: 1열 (자동 스택)

### 브라우저 호환성
- Next.js 16.2.1의 Turbopack 번들러로 컴파일 성공
- `requestAnimationFrame` API 사용 (모던 브라우저 표준)

## 성능 고려사항
- Intersection Observer 사용으로 불필요한 애니메이션 방지
- 한 번만 실행되도록 설계 (메모리 누수 방지)
- `useRef`로 중복 실행 방지

## 향후 개선 가능 사항
1. 애니메이션 지속 시간과 지연을 외부 props로 구성 가능하게 개선
2. 통계 데이터를 CMS에서 동적으로 로드
3. 다양한 통계 수 지원 (현재는 3개 고정)
