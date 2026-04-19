"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { sanitizeHtml } from "@/lib/sanitize";

type NotificationItem = {
  id: string;
  isRead: boolean;
  notification: {
    id: string;
    title: string;
    contentHtml: string | null;
    publishedAt: string | null;
    createdAt: string;
    author: { id: string; name: string };
    class: { id: string; name: string };
  };
};

export default function NotificationList({
  initialItems,
  total,
  page,
  limit,
}: {
  initialItems: NotificationItem[];
  total: number;
  page: number;
  limit: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState(initialItems);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function handleCopyLink(e: React.MouseEvent, notificationId: string) {
    e.stopPropagation();
    const url = `${window.location.origin}/my-account/notification/${notificationId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard API 미지원 환경 fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopiedId(notificationId);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === notificationId ? null : prev));
    }, 1500);
  }

  const unreadCount = items.filter((i) => !i.isRead).length;
  const totalPages = Math.ceil(total / limit);

  async function handleExpand(item: NotificationItem) {
    if (expanded === item.id) {
      setExpanded(null);
      return;
    }
    setExpanded(item.id);

    if (!item.isRead) {
      // 낙관적 업데이트 — 서버 응답을 기다리지 않고 UI 갱신
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isRead: true } : i))
      );
      try {
        await fetch("/api/my-notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId: item.notification.id }),
        });
      } catch {
        // 실패 시 원복
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isRead: false } : i))
        );
      }
    }
  }

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">알림장</h1>
          <p className="mt-1 text-gray-500">담당 선생님의 알림과 메시지를 확인하세요.</p>
        </div>
        {unreadCount > 0 && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            미읽음 {unreadCount}개
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg
            className="w-14 h-14 mb-4 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <p className="font-medium text-gray-500">받은 알림장이 없습니다</p>
          <p className="text-sm mt-1 text-gray-400">선생님이 알림을 보내면 여기서 확인할 수 있어요.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border transition-all cursor-pointer ${
                !item.isRead
                  ? "bg-orange-50/50 border-orange-200 hover:bg-orange-50"
                  : "bg-white border-gray-200 hover:bg-slate-50"
              }`}
            >
              <div className="p-5" onClick={() => handleExpand(item)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-700">
                        {item.notification.class.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.notification.publishedAt
                          ? new Date(item.notification.publishedAt).toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : new Date(item.notification.createdAt).toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </span>
                      {!item.isRead && (
                        <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{item.notification.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.notification.author.name} 선생님</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 mt-1">
                    <button
                      type="button"
                      onClick={(e) => handleCopyLink(e, item.notification.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-700 transition-colors"
                      title="이 알림장의 링크 복사"
                      aria-label="이 알림장의 링크 복사"
                    >
                      {copiedId === item.notification.id ? (
                        <>
                          <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-green-600">복사됨</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span>링크</span>
                        </>
                      )}
                    </button>
                    <Link
                      href={`/my-account/notification/${item.notification.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-700 transition-colors"
                      title="새 페이지에서 열기"
                      aria-label="새 페이지에서 열기"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ml-1 ${
                        expanded === item.id ? "rotate-180" : ""
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
                  </div>
                </div>
              </div>

              {expanded === item.id && item.notification.contentHtml && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(item.notification.contentHtml),
                    }}
                  />
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <Link
                      href={`/my-account/notification/${item.notification.id}`}
                      className="inline-flex items-center text-xs font-medium text-cls-orange hover:underline"
                    >
                      상세 페이지로 이동
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => goToPage(page + 1)}
            className="px-6 py-2 border border-gray-300 text-sm font-bold text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            더보기 ({items.length}/{total})
          </button>
        </div>
      )}
    </div>
  );
}
