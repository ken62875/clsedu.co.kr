# 비밀번호 찾기 기능 구축 결과 보고서

**작업일시**: 2026년 4월 12일
**작업자**: Antigravity

## 1. 개요
본 문서는 `app.clsedu.co.kr` (현재 개발 경로: `/src/app`)의 프론트엔드 및 백엔드에 Brevo SMTP 연동을 통한 **비밀번호 찾기(이메일 발송)** 및 **비밀번호 재설정** 기능 구현 내역을 요약합니다.

## 2. 작업 내용

### 2.1. 데이터베이스 변경 (`prisma/schema.prisma`)
- `PasswordResetToken` 테이블 추가
  - 역할: 비밀번호 변경 요청 시 생성되는 일회성/유효기간 지정 보안 토큰 관리
  - 환경 반영: 데이터베이스에 변경사항을 반영하기 위해 `npx prisma db push` (혹은 `prisma migrate dev`) 명령어가 필요합니다.

### 2.2. 필요한 라이브러리 추가 설치
- 메일 전송 프로토콜(SMTP) 사용을 위해 `nodemailer` 모듈과 타입 선언(`@types/nodemailer`) 패키지 설치를 완료했습니다.

### 2.3. 이메일 발송 관련 API (`/api/auth/forgot-password`)
- 가입된 이메일을 입력받아 `users` 테이블 존재 확인 후, 32바이트 암호화 토큰(Hex 타입)을 생성하여 `PasswordResetToken` 에 저장.
- Brevo SMTP 서버를 통해 전송:
  - 사전 조건: `.env` 환경 파일에 `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` 설정 필요
  - 메일 본문에 사용자가 비밀번호를 재설정할 수 있는 안전한 링크(`app.clsedu.co.kr/login/reset-password?token=...`) 포함.

### 2.4. 비밀번호 재설정 API (`/api/auth/reset-password`)
- 쿼리 파라미터로 넘어온 `token` 과 새로운 `password` 를 수신.
- 토큰의 유효 기간(발행 후 1시간 유효) 및 존재 여부 검증.
- `bcryptjs` 모듈을 통한 단방향 비밀번호 해싱 후 `users` 테이블의 `password_hash` 변경.
- 변경 완료 후 DB상에 보존된 보안 토큰(`PasswordResetToken`) 삭제 조치.

### 2.5. 프론트엔드 UI 화면 추가 및 연동
1. **/login/forgot-password** 페이지 신규 구현 
   - 이메일 입력 폼 및 전송하기 버튼 구현
   - 전송 성공/실패 안내 메시지 처리 로직 포함
2. **/login/reset-password** 페이지 신규 구현
   - `searchParams`로 URL 토큰 파싱
   - 새 비밀번호 확인 인터페이스 구현 (유효성 검사 내장)
3. **기존 로그인 페이지 연결**
   - 기존의 빈 링크인 `비밀번호를 잊으셨나요?` 항목 클릭 시, 생성된 `/login/forgot-password` 로 진입하도록 링크 경로 수정완료 (`/src/app/login/page.tsx`).

## 3. Git 버전 반영 가이드 (안내)

해당 작업은 완료되었으며, Github에 반영하시려면 터미널을 열고 다음의 명령어를 차례대로 입력하시면 됩니다.

```bash
git add .
git commit -m "feat: 비밀번호 찾기 및 재설정 기능 추가 (Brevo SMTP 연동)"
git push origin main
```

> **주의사항**
> 실제 환경에 코드를 배포하기 আগে DB 스키마 업데이트 커맨드(`npx prisma db push`)를 실행하시고, 웹 서비스가 돌아가는 환경의 시스템(환경변수 설정 화면 혹은 `.env` 파일)에 메일 송신용 SMTP 환경변수값들이 제대로 들어가 있는지 반드시 확인해주세요.
