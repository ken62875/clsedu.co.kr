# 교과과정 하위 페이지 생성 및 메뉴 개편

## 작업 요약
* **대상 페이지**: `/curriculum` 하위 서브 페이지 (고등부, 중등부, 초등부, 특별 프로그램)
* **목표**: 각 학부 및 특별 프로그램별 상세 페이지를 생성하고, PC 및 모바일 글로벌 네비게이션(GNB)에 2Depth 메뉴 적용.

## 진행 사항
1. **GNB 헤더 메뉴 개편 (완료)**
   * `src/components/layout/Header.tsx` 파일을 수정하여 '교과과정' 네비게이션 아래에 2Depth 메뉴(Dropdown)를 추가했습니다.
   * 모바일 메뉴 내에서도 들여쓰기 형태의 2Depth 서브 메뉴가 표시되도록 구조를 개선했습니다.

2. **하위 페이지 구조 및 UI 작업 (진행 중)**
   * `src/app/curriculum/high-school/page.tsx` (`docs/CLS-교과과정-고등부.md` 내용 반영)
   * `src/app/curriculum/middle-school/page.tsx` (`docs/CLS-교과과정-중등부.md` 내용 반영)
   * `src/app/curriculum/special-program/page.tsx` (특별 프로그램 2종 카드 형태 구성 반영)

3. **추가 UI 개선 및 외부 이미지 연동 (완료)**
   * 최상단에 GNB(알림장, 교육비 결제, 교육상담예약 | 로그인, 회원가입)를 파이프라인(`|`)으로 구분하여 추가했습니다.
   * 메인 헤더의 내비게이션 메뉴가 중앙 정렬되도록 레이아웃 속성을 `flex-1`을 사용해 교정했습니다.
   * 고/중/초등부 페이지 상단의 불필요한 패딩 여백(`pt-24`)을 삭제하여, Hero 섹션이 화면 최상단부터 출력(Flush)되도록 수정했습니다. 
   * 단, fixed된 헤더와 글자가 겹치지 않도록 내부 컨테이너에 `pt-20 md:pt-32`를 부여했습니다.
   * `next.config.ts`의 `images.remotePatterns`에 `media.clsedu.co.kr`을 추가하여 외부 이미지 사용을 허용했습니다.
   * 각 페이지의 Hero Background Image를 요청된 절대 경로(`media.clsedu.co.kr/...`)로 적용 완료했습니다.

4. **Git 버전 관리 (완료)**
   * `git add .` 및 `git commit -m "feat: 상단 GNB 추가, 메뉴 정렬 맞춤, Hero 섹션 이미지 및 여백 수정"` 실행.
   * `git push origin main`으로 원격 저장소 배포를 완료했습니다.

## 이미지 맵핑 기준
사용자 요청에 기재된 이미지 경로에 혼선(초등부에 high_school, 고등부에 elementary 등)이 있어, 상식적으로 올바른 이미지가 표시되도록 아래와 같이 매칭하여 구현합니다:
* **고등부**: `/images/programs/high_school_study.jpg`
* **중등부**: `/images/programs/middle_school_study.jpg`
* **초등부**: `/images/programs/elementary_study.jpg`

## UI/UX 포인트
* 각 페이지 상단에는 대표 이미지를 활용한 시각적인 Hero 영역과 타이틀을 배치합니다.
* 사용자가 전달한 Markdown 내용을 분석하여, `FadeIn` 애니메이션 컴포넌트와 Tailwind CSS를 활용한 Card 디자인, Grid 레이아웃 등으로 깔끔하게 변환합니다.
* 특별 프로그램은 요청하신 대로 2개의 아이템('국어 개념 완성', '2025 윈터스쿨 학습 계획')을 카드 형태로 구성합니다.
