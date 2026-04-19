import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getMyAccountUser, getMyNotificationById } from "@/lib/my-account/queries";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await getMyAccountUser();
  if (!user) return { title: "알림장 | CLS 에듀케이션" };

  const item = await getMyNotificationById(user.id, id);
  if (!item) return { title: "알림장 | CLS 에듀케이션" };

  return {
    title: `${item.notification.title} | 알림장 | CLS 에듀케이션`,
    description: item.notification.contentHtml
      ? item.notification.contentHtml.replace(/<[^>]*>/g, "").slice(0, 120)
      : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getMyAccountUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const item = await getMyNotificationById(user.id, id);
  if (!item) notFound();

  // 상세 진입 시 읽음 처리 (서버에서 바로 UPDATE)
  if (!item.isRead) {
    await prisma.$executeRaw`
      UPDATE notification_recipients
      SET is_read = true, read_at = NOW()
      WHERE notification_id = ${item.notification.id}
        AND user_id = ${user.id}
    `;
  }

  const publishedDate = item.notification.publishedAt ?? item.notification.createdAt;
  const dateLabel = new Date(publishedDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <article className="animate-in fade-in duration-500">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <Link
          href="/my-account/notification"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          알림장 목록으로
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <header className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-700">
              {item.notification.class.name}
            </span>
            <span className="text-sm text-gray-500">{dateLabel}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {item.notification.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {item.notification.author.name} 선생님
          </p>
        </header>

        <div className="p-6">
          {item.notification.contentHtml ? (
            <div
              className="prose prose-sm sm:prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(item.notification.contentHtml),
              }}
            />
          ) : (
            <p className="text-gray-400 italic">내용이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Link
          href="/my-account/notification"
          className="px-5 py-2 border border-gray-300 text-sm font-bold text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
        >
          목록으로
        </Link>
      </div>
    </article>
  );
}
