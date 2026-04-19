"use client";

import Link from "next/link";

export default function PaymentPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);

  return (
    <div className="flex justify-center mt-6">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <Link
          href={`?page=${prev}`}
          aria-disabled={page === 1}
          prefetch
          className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
            page === 1 ? "text-gray-300 pointer-events-none" : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          이전
        </Link>
        <span className="relative inline-flex items-center px-4 py-2 border border-cls-orange bg-orange-50 text-sm font-bold text-cls-orange">
          {page} / {totalPages}
        </span>
        <Link
          href={`?page=${next}`}
          aria-disabled={page >= totalPages}
          prefetch
          className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
            page >= totalPages
              ? "text-gray-300 pointer-events-none"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          다음
        </Link>
      </nav>
    </div>
  );
}
