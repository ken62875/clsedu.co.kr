// 서버/클라이언트 양쪽에서 재사용하는 입력값 검증 유틸.
// 국내 전화번호·이메일·비밀번호 등 공통 룰을 한곳에서 관리합니다.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^01[0-9]-?\d{3,4}-?\d{4}$/;

export function isEmail(v: unknown): v is string {
  return typeof v === 'string' && EMAIL_REGEX.test(v);
}

export function isPhone(v: unknown): v is string {
  return typeof v === 'string' && PHONE_REGEX.test(v);
}

// 숫자만 남기고 포맷 제거 (010-1234-5678 → 01012345678)
export function normalizePhone(v: string): string {
  return v.replace(/[^0-9]/g, '');
}

// 비밀번호 강도: 8자 이상 + 숫자/문자 포함
export function isStrongPassword(v: unknown): v is string {
  if (typeof v !== 'string') return false;
  if (v.length < 8 || v.length > 72) return false;
  const hasLetter = /[A-Za-z]/.test(v);
  const hasDigit = /\d/.test(v);
  return hasLetter && hasDigit;
}

export const PASSWORD_RULE_MESSAGE =
  '비밀번호는 영문과 숫자를 조합하여 8자 이상으로 입력해주세요.';

// 공백·탭만 있는 문자열 방지
export function isNonEmpty(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}
