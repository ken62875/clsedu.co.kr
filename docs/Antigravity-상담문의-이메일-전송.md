# 🤔 실행 기획 및 개발 과정: 상담 문의 이메일 발송 기능 구현

## 1. 개요
* **목표**: `/contact` 페이지에서 제출된 상담 문의 양식을 특정 이메일 주소로 자동 발송.
* **수신자**: `info@clsedu.co.kr`
* **숨은참조(BCC)**: `ivy@ivynet.co.kr`
* **발신자**: `info@clsedu.co.kr` (기본 발신자명: CLS에듀케이션)

## 2. 작업 내용
### 2.1 API Route 생성 (`/src/app/api/contact/route.ts`)
* `nodemailer` 패키지를 활용한 이메일 전송 로직 구현했습니다.
* **SMTP 설정**: 서버 환경변수(`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)를 사용하여 트랜스포터(transporter) 생성했습니다. 기존 비밀번호 찾기(`forgot-password`)에서 사용하는 설정 방식을 활용했습니다.
* **메일 옵션**:
  * `from`: `info@clsedu.co.kr` (발신자명: CLS에듀케이션)
  * `to`: `info@clsedu.co.kr`
  * `bcc`: `ivy@ivynet.co.kr`
  * `subject`: `[CLS에듀케이션] {학생이름} 학생 상담 문의` 형식으로 가시성을 개선했습니다.
  * `html`: 제공받은 폼 데이터(학생 이름, 학교/학년, 연락처, 관심 과목, 문의 내용)를 표(Table) 형태로 깔끔하게 구성한 HTML 템플릿 사용했습니다.

### 2.2 클라이언트 페이지 수정 (`/src/app/contact/page.tsx`)
* 기존 정적 퍼블리싱 상태의 페이지를 `"use client"` 지시어를 추가하여 클라이언트 컴포넌트로 변경했습니다.
* `useState`를 통해 폼 데이터를 상태 관리하고, 사용자 입력에 따라 동적으로 상태를 업데이트 하도록 구성했습니다.
* `fetch` 함수를 사용하여 `/api/contact` API로 전송 요청(POST)을 보내는 `handleSubmit` 함수를 작성했습니다.
* 필수 입력 사항 검증 및 개인정보 수집 동의 누락 시 경고창 처리, 전송 중 로딩 상태 UI 반영 등의 추가 작업을 적용했습니다.

## 3. Git 변경사항 가이드
명령어를 터미널에서 실행하여 변경된 내용을 GitHub 저장소에 반영할 수 있습니다.
\`\`\`bash
git add src/app/api/contact/route.ts src/app/contact/page.tsx docs/Antigravity-상담문의-이메일-전송.md
git commit -m "feat: 상담 문의 이메일 전송 기능 구현 (Nodemailer 연동)"
git push origin main
\`\`\`

## 4. 유의사항
* 이메일이 정상적으로 발송되려면 환경 변수(`.env` 또는 호스팅 서버 환경 변수)에 SMTP 서버 설정(`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` 등)이 제대로 구성되어 있어야 합니다.
