import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Generate an array of page numbers e.g. [1, 2, 3] depending on the total
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-2 text-sm text-gray-500 hover:text-cls-blue border rounded-md"
        >
          &lt; prev
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-gray-300 border border-gray-100 rounded-md cursor-not-allowed">
          &lt; prev
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            page === currentPage
              ? "bg-cls-blue text-white font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-2 text-sm text-gray-500 hover:text-cls-blue border rounded-md"
        >
          next &gt;
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-gray-300 border border-gray-100 rounded-md cursor-not-allowed">
          next &gt;
        </span>
      )}
    </div>
  );
}
