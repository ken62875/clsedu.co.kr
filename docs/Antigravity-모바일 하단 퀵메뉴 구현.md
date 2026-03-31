# 모바일 하단 퀵메뉴 구현

## 1. 개요
* **목표:** 모바일 환경에서 사용자의 편의성을 높이기 위해 하단에 항상 고정되는 5개의 퀵메뉴 아이콘(교과과정, 강사소개, 프로그램, 스토리, 상담문의)을 추가합니다.
* **관련 파일:** 
  * `src/components/layout/MobileBottomNav.tsx` (신규)
  * `src/app/layout.tsx` (수정)

## 2. 작업 내용
1. **`MobileBottomNav` 컴포넌트 생성**
   * `lucide-react` 대신 SVG 코드를 직접 사용하여 아이콘을 렌더링하도록 구현했습니다.
   * `next/navigation`의 `usePathname`을 활용하여 현재 위치한 페이지의 메뉴 아이콘 색상이 오렌지색(`text-cls-orange`)으로 강조되도록 활성화 상태를 구현했습니다.
   * 모바일(`md:hidden`) 화면에서만 보이도록 설정하고, 하단에 고정(`fixed bottom-0`) 처리했습니다.

2. **`RootLayout`에 컴포넌트 적용**
   * 전역 레이아웃인 `src/app/layout.tsx`에 `MobileBottomNav`를 추가하여 모든 페이지에서 하단 내비게이션 바가 렌더링되게 설정했습니다.
   * 모바일 기기에서 하단 고정 메뉴로 인해 기존 콘텐츠가 가려지는 문제를 방지하고자 `body` 태그에 하단 패딩(`pb-16`)을 추가하였으며, 데스크탑에서는 패딩이 적용되지 않도록(`md:pb-0`) 처리했습니다.

## 3. Git 커밋 가이드
작업이 완료된 후 다음 명령어를 실행하여 변경사항을 반영해 주세요.

```bash
git add src/components/layout/MobileBottomNav.tsx src/app/layout.tsx docs/Antigravity-모바일\ 하단\ 퀵메뉴\ 구현.md
git commit -m "feat: 모바일 하단 퀵메뉴 UI 및 라우팅 추가"
git push origin main
```
