import { redirect } from "next/navigation";
import { getMyAccountUser } from "@/lib/my-account/queries";
import Sidebar from "@/components/my-account/Sidebar";

// layout.tsx 는 모든 마이페이지 하위 요청에서 가장 먼저 실행됩니다.
// getMyAccountUser() 는 React.cache 로 감싸져 있어, 동일 request 내에서
// page.tsx 가 같은 함수를 다시 호출해도 DB 는 한 번만 질의됩니다.
export default async function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMyAccountUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar user={{ name: user.name, role: user.role, avatarUrl: user.avatarUrl }} />
          <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
