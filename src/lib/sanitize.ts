import DOMPurify from 'isomorphic-dompurify';

// 알림장·블로그 등 서버에서 내려주는 HTML 을 렌더링하기 전에 필수로 호출합니다.
// 화이트리스트 기반으로 인라인 이벤트, <script>, javascript: 링크 등을 제거합니다.
export function sanitizeHtml(input: string | null | undefined): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'iframe', 'form', 'input', 'script', 'object', 'embed'],
    FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick', 'onmouseover'],
    ALLOW_DATA_ATTR: false,
  });
}
