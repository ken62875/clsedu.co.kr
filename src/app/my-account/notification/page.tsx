"use client";

import { useState, useEffect, useCallback } from "react";

interface NotificationItem {
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
}

export default function NotificationPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const LIMIT = 20;

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/my-notifications?page=${page}&limit=${LIMIT}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.recipients || []);
      setTotal(data.total || 0);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleExpand = async (item: NotificationItem) => {
    if (expanded === item.id) {
      setExpanded(null);
      return;
    }
    setExpanded(item.id);

    // 읽지 않은 경우 읽음 처리
    if (!item.isRead) {
      await fetch("/api/my-notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: item.notification.id }),
      });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isRead: true } : i))
      );
    }
  };

  const unreadCount = items.filter((i) => !i.isRead).length;
  const totalPages = Math.ceil(total / LIMIT);

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-14 h-14 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
              {/* 헤더 (항상 표시) */}
              <div
                className="p-5"
                onClick={() => handleExpand(item)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-700">
                        {item.notification.class.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.notification.publishedAt
                          ? new Date(item.notification.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
                          : new Date(item.notification.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                      {!item.isRead && (
                        <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{item.notification.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.notification.author.name} 선생님</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform mt-1 ${expanded === item.id ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* 본문 (펼침) */}
              {expanded === item.id && item.notification.contentHtml && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.notification.contentHtml }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 더 보기 */}
      {totalPages > 1 && page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 border border-gray-300 text-sm font-bold text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            더보기 ({items.length}/{total})
          </button>
        </div>
      )}
    </div>
  );
}
