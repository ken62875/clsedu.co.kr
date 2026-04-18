# 마이페이지 DB 연동 및 프로필 기능 구현

작업일: 2026-04-19

---

## 개요

`clsedu.co.kr` 홍보 사이트의 마이페이지(`/my-account/`) 전 기능을 실제 데이터베이스와 연동하고, 프로필 사진 업로드 기능을 추가하였습니다.

---

## 구현 기능

### 1. 자동 리다이렉트
- `/my-account/` 접근 시 `/my-account/dashboard`로 자동 이동

### 2. 사이드바 실시간 연동
- 로그인한 사용자의 **이름**과 **회원 유형**(학생/학부모/강사/관리자) 표시
- **프로필 사진** 등록 시 사이드바 상단에 이미지 표시, 미등록 시 이름 첫 글자 이니셜 표시

### 3. 대시보드 DB 연동 (`/my-account/dashboard`)
- 나의 수업 수 (활성 수강 기준)
- 오늘 시간표 (수업명, 강사명, 시간)
- 최근 결제 내역
- 공지사항 최신 5건

### 4. 프로필 페이지 (`/my-account/profile`)
- **프로필 사진**: 클릭하여 이미지 선택 → 미리보기 → "사진 저장" 버튼으로 Cloudflare R2 업로드
  - 지원 형식: JPG, PNG, WebP, GIF (최대 5MB)
- **이름**: 읽기 전용 (변경 불가)
- **이메일·휴대폰**: 직접 수정 후 저장 가능
- **비밀번호**: 기본 숨김(•••••••••), "수정" 클릭 시 현재/새 비밀번호 입력 폼 활성화

---

## 기술 구성

### 신규 API 엔드포인트

| 경로 | 메서드 | 설명 |
|---|---|---|
| `/api/my-dashboard` | GET | 대시보드 통계·시간표·공지 조회 |
| `/api/profile` | GET | 프로필 정보 조회 |
| `/api/profile` | PATCH | 이메일·휴대폰·비밀번호 수정 |
| `/api/profile/avatar` | POST | 프로필 사진 업로드 |

### 파일 스토리지 (Cloudflare R2)
- 업로드 경로: `avatars/avatar-{userId}-{timestamp}.{ext}`
- 공개 URL: `https://media.clsedu.co.kr/avatars/...`

### DB 변경 사항
- `users` 테이블에 `avatar_url TEXT` 컬럼 추가

---

## 운영 환경 설정

### Coolify 환경 변수 (clsedu.co.kr 앱)
| 변수명 | 용도 |
|---|---|
| `R2_ACCOUNT_ID` | Cloudflare 계정 ID |
| `R2_ACCESS_KEY_ID` | R2 API 액세스 키 |
| `R2_SECRET_ACCESS_KEY` | R2 API 시크릿 키 |
| `R2_BUCKET_NAME` | `clsedu` |
| `R2_PUBLIC_URL` | `https://media.clsedu.co.kr` |

---

## 관련 커밋

| 커밋 | 내용 |
|---|---|
| `ca95d61` | 마이페이지 DB 연동 초기 구현 |
| `d76b785` | 로그인 Race Condition 수정 |
| `164e061` | Docker 빌드 오류 수정 |
| `81e59d2` | 프로필 업데이트 avatar_url 오류 수정 |
