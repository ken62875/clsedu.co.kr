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
   * `src/app/curriculum/elementary-school/page.tsx` (`docs/CLS-교과과정-초등부.md` 내용 반영)
   * `src/app/curriculum/special-program/page.tsx` (특별 프로그램 2종 카드 형태 구성 반영)

## 이미지 맵핑 기준
사용자 요청에 기재된 이미지 경로에 혼선(초등부에 high_school, 고등부에 elementary 등)이 있어, 상식적으로 올바른 이미지가 표시되도록 아래와 같이 매칭하여 구현합니다:
* **고등부**: `/images/programs/high_school_study.jpg`
* **중등부**: `/images/programs/middle_school_study.jpg`
* **초등부**: `/images/programs/elementary_study.jpg`

## UI/UX 포인트
* 각 페이지 상단에는 대표 이미지를 활용한 시각적인 Hero 영역과 타이틀을 배치합니다.
* 사용자가 전달한 Markdown 내용을 분석하여, `FadeIn` 애니메이션 컴포넌트와 Tailwind CSS를 활용한 Card 디자인, Grid 레이아웃 등으로 깔끔하게 변환합니다.
* 특별 프로그램은 요청하신 대로 2개의 아이템('국어 개념 완성', '2025 윈터스쿨 학습 계획')을 카드 형태로 구성합니다.
