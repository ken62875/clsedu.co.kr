# 교과과정 페이지 구현 (Curriculum Page)

## 개요
사용자 요청에 따라 CLS 에듀케이션 웹사이트의 교과과정 페이지 (`/curriculum`)를 더미 컨텐츠 기반의 복잡한 테이블 형태와 탭 구조로 구현하였습니다.

## 주요 구현 사항

1. **상태 관리 및 탭 UI (Tabs)**
   - `useState`를 활용하여 초등부(`primary`), 중등부(`middle`), 고등부(`high`) 탭 상태를 독립적으로 관리합니다.
   - 탭 전환 시 부드러운 애니메이션 효과를 부여하고 활성화된 탭에 색상 포인트를 적용하여 직관성을 높였습니다.

2. **교과과정 시간표 (Complex Table)**
   - 과목, 학습 내용, 클래스룸, 시간, 담당 강사 정보를 포함하는 테이블을 디자인 하였습니다.
   - 모바일 환경을 고려하여 가로 스크롤(overflow-x-auto)과 최소 너비(min-w-[800px])를 설정하여 데이터가 훼손되지 않고 깔끔하게 보이도록 테이블을 구성하였습니다.

3. **수강료 표시 및 온라인 결제 연결 버튼 (Pricing & Payment Button)**
   - 각 대상 학년별 수강료를 컨텐츠 상단에 배치하여 가시성을 강조하였습니다.
   - 테이블 하단에 탭별 대상 이름(예: "초등부 수업 온라인 결제")이 연동되는 CTA(Call To Action) 결제 버튼을 추가하였습니다.
   - 현재 결제 모듈 연동 전이므로, 클릭 시 안내 alert 창이 뜨도록 Mockup 처리 하였습니다.

4. **UI/UX 폴리싱**
   - 글로벌 테마 설정(CLS Education Theme Colors)을 적용하여 전체 웹사이트와의 시각적 통일성을 유지했습니다.
   - 기존 구현된 `FadeIn` 컴포넌트를 활용하여 스크롤 시 텍스트 및 테이블이 자연스럽게 나타나도록 애니메이션 연출을 추가하였습니다.

## 작업 파일 내역
- `src/app/curriculum/page.tsx`: 신규 UI 및 데이터 스키마 반영

## 후속 작업 제안 및 안내
- **결제 시스템 (Payment Gateway) 연동**: 추후 토스페이먼츠(Toss Payments), 아임포트(PortOne) 등 실제 온라인 PG사 결제 모듈 연동이 필요합니다.
- 본 작업 내역을 Github에 반영하시려면 터미널에서 아래의 git 명령어를 실행해주세요.
```bash
git add src/app/curriculum/page.tsx docs/Antigravity-교과과정\ 페이지\ 구현.md
git commit -m "feat: 교과과정 페이지 탭 및 시간표 UI 구현"
git push
```
