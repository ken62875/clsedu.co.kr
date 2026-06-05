"use client";

import { useState, type ReactNode } from "react";

/**
 * 모바일 전용 아코디언 섹션.
 * - 모바일(<md): 헤더를 탭하면 본문이 펼쳐지고 접힌다 (가독성 ↑)
 * - 데스크톱(md+): 항상 펼쳐진 상태로 표시되며 토글 비활성 (디자인 유지)
 */
export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className = "",
  chevronClassName = "text-cls-black",
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  chevronClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 text-left md:cursor-default"
      >
        <span className="flex-1 min-w-0">{title}</span>
        <svg
          className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 md:hidden ${chevronClassName} ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className={`${open ? "block" : "hidden"} md:block`}>{children}</div>
    </div>
  );
}
