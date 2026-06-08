"use client";

import { useState } from "react";

/**
 * 블로그(스토리) 글 공유 버튼.
 * - 모바일: 네이티브 공유 시트(navigator.share) → 카카오톡 등으로 바로 공유
 * - 데스크톱: 링크 복사 + X/페이스북 공유
 */
export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 클립보드 권한 거부 시 무시 */
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* 사용자가 취소한 경우 무시 */
      }
    } else {
      handleCopy();
    }
  };

  const btn =
    "inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-cls-blue hover:text-cls-blue transition-colors";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-400 mr-0.5">공유</span>

      {/* 공유하기 (모바일 네이티브 / 데스크톱은 복사로 폴백) */}
      <button type="button" onClick={handleNativeShare} className={btn} aria-label="공유하기">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        공유하기
      </button>

      {/* 링크 복사 */}
      <button type="button" onClick={handleCopy} className={btn} aria-label="링크 복사">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m9.156-2.328a4 4 0 010-5.656l-3-3a4 4 0 00-5.656 5.656" />
        </svg>
        {copied ? "복사됨!" : "링크 복사"}
      </button>

      {/* X(트위터) */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="X에 공유"
      >
        X
      </a>

      {/* 페이스북 */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="페이스북에 공유"
      >
        f
      </a>
    </div>
  );
}
