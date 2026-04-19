import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/my-account/Sidebar";

// 서버 컴포넌트로 인증 검증을 한 번에 처리합니다.
// - 세션이 없으면 /login 으로 즉시 리다이렉트 (미로그인 상태에서 private 콘텐츠가 클라이언트로 전송되지 않음)
// - 쿠키에 저장된 스냅샷 대신 DB 에서 최신 사용자 정보를 조회해 avatarUrl/role 변경을 즉시 반영
export default async function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  let user = {
    name: session.name,
    role: session.role,
    avatarUrl: session.avatarUrl ?? null,
  };

  try {
    const fresh = await prisma.user.findUnique({
      where: { id: session.id },
      select: { name: true, role: true, avatarUrl: true },
    });
    if (fresh) {
      user = {
        name: fresh.name,
        role: fresh.role?.toLowerCase() ?? session.role,
        avatarUrl: fresh.avatarUrl,
      };
    }
  } catch {
    // avatar_url 컬럼 미존재 등 비치명적 오류는 세션 스냅샷으로 fallback
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar user={user} />
          <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
