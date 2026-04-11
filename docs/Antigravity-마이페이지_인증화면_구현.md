# 마이페이지 및 인증 화면 구현 리뷰

## 1. 개요
프론트엔드 환경에 사용자 인증 화면(로그인, 회원가입)과 로그인 후 접근 가능한 마이페이지 메뉴를 구축했습니다. 이번 구현은 실제 데이터베이스와의 연동 없이, React Context API 기반의 임시 전역 상태 관리(`AuthProvider`)를 활용해 UI/UX 로직과 컴포넌트 디자인을 우선 완성하는 것을 목표로 하였습니다.

## 2. 작업 내역 및 구조

### 2.1. 인증 상태 관리 체계
- **`src/providers/AuthProvider.tsx`**: 로그인 정보를 전역에서 관리합니다. `login` 메서드를 호출하면 더미 데이터를 Context에 주입하며, 즉각적으로 헤더와 내비게이션 요소에서 상태를 반영합니다.
- **`src/app/layout.tsx`**: `RootLayout` 최상단에 `AuthProvider`를 감싸 전체 페이지에서 인증 상태를 공유하도록 변경했습니다.

### 2.2. GNB 및 Header 수정
- **`src/components/layout/Header.tsx`**
  - PC 버전 상단 GNB: 미로그인 시 `로그인 | 회원가입`을 노출하고, 로그인 시 `마이페이지 | 로그아웃`을 노출하도록 분기 처리했습니다.
  - 모바일 메뉴: 하단 영역에 인증 상황에 맞는 내비게이션 링와 로그아웃 버튼을 추가하여 모바일 접근성을 확보했습니다.

### 2.3. 로그인 / 회원가입 페이지
- **`/login`**: 이메일/휴대폰 및 비밀번호 필드, 소셜 로그인 (네이버, 카카오, 구글) 더미 버튼을 최신 트렌드를 반영한 카드뷰 형태로 구현했습니다. Submit 시 `AuthProvider`의 login을 호출하며 마이페이지로 이동합니다.
- **`/signup`**: 학부모와 학생을 분리하는 탭 방식의 폼을 구현했습니다. 학부모의 경우 자녀 여러 명을 추가할 수 있는 디자인을 반영하였습니다.

### 2.4. 마이페이지 (My Account)
- **`/my-account/layout.tsx`**: 좌측 사이드바와 우측 컨텐츠 영역으로 구분된 공통 레이아웃. 미로그인 시 접근을 방지하도록 `useEffect`를 통해 /login 화면으로 리디렉션 처리했습니다.
- **서브 메뉴 라우트**:
  - `dashboard`: 학습 데이터 및 결제 현황 요약 위젯 화면.
  - `class`: 현재 수강 중인 수업과 진도율(Progress) 막대 UI.
  - `payment`: 과거/미납 결제 내역을 확인할 수 있는 깔끔한 표 테이블 구조.
  - `notification`: 학원 공지와 과제 안내, 읽지 않은 표시 등 리스트 형태의 뷰 디자인.
  - `profile`: 계정 소유자의 정보를 열람하고 편집(시뮬레이션)할 수 있는 화면.

## 3. 깃허브 배포(Git) 가이드
위 변경사항들은 현재 로컬 워크스페이스에 저장되어 있습니다. Github에 반영하려면 터미널에서 다음 명령어를 순차적으로 실행해 주세요.

```bash
git add src/providers/AuthProvider.tsx src/app/layout.tsx src/components/layout/Header.tsx src/app/login src/app/signup src/app/my-account docs/Antigravity-마이페이지_인증화면_구현.md
git commit -m "feat: 마이페이지 및 인증(로그인, 회원가입) UI 구현 및 더미 데이터 반영"
git push origin HEAD
```

추후 백엔드 API가 개발되고 연동 준비가 되면, 기존 `AuthProvider.tsx`와 더미 로직 부분을 걷어내고 실제 API(예: NextAuth 또는 커스텀 Axios/Fetch)를 연동하는 방식으로 매끄럽게 전환할 수 있습니다.
