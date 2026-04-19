import { redirect } from "next/navigation";
import { getMyAccountUser, getMyNotifications } from "@/lib/my-account/queries";
import NotificationList from "@/components/my-account/NotificationList";

const LIMIT = 20;

export default async function NotificationPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await getMyAccountUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10));

  const { items, total } = await getMyNotifications(user.id, page, LIMIT);

  // Date 객체는 Client Component 경계를 넘기 위해 직렬화
  const serializable = items.map((item) => ({
    ...item,
    notification: {
      ...item.notification,
      publishedAt: item.notification.publishedAt?.toISOString() ?? null,
      createdAt: item.notification.createdAt.toISOString(),
    },
  }));

  return (
    <NotificationList
      initialItems={serializable}
      total={total}
      page={page}
      limit={LIMIT}
    />
  );
}
