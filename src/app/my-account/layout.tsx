"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function getRoleLabel(role?: string) {
  const r = role?.toUpperCase();
  if (r === 'STUDENT') return '학생 회원';
  if (r === 'PARENT') return '학부모 회원';
  if (r === 'TEACHER') return '강사';
  if (r === 'ADMIN' || r === 'SUPER_ADMIN') return '관리자';
  return '회원';
}

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const navItems = [
    { name: "대시보드", href: "/my-account/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "나의 수업", href: "/my-account/class", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { name: "결제내역", href: "/my-account/payment", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    { name: "알림장", href: "/my-account/notification", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { name: "프로필", href: "/my-account/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
              <div className="p-6 border-b border-gray-100 bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-cls-orange/10 flex items-center justify-center mb-4 overflow-hidden border-2 border-orange-100">
                  {(user as any)?.avatarUrl ? (
                    <Image
                      src={(user as any).avatarUrl}
                      alt={user?.name || ''}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                      unoptimized
                    />
                  ) : (
                    <span className="text-2xl font-bold text-cls-orange">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{user?.name || '사용자'} 님</h2>
                <p className="text-sm text-gray-500">{getRoleLabel(user?.role)}</p>
              </div>
              <nav className="p-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                        isActive
                          ? "bg-cls-orange text-white shadow-md"
                          : "text-gray-600 hover:bg-slate-50 hover:text-cls-orange"
                      }`}
                    >
                      <svg className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
