import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/ui/FloatingButton";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { AuthProvider } from "@/providers/AuthProvider";
import { getSession } from "@/lib/auth";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "CLS 에듀케이션",
  description: "진짜 실력은 속도가 아니라 깊이에서 나옵니다. 초중고 내신/입시 전문 보습학원",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 서버에서 세션 쿠키를 해독해 AuthProvider 에 initial 로 주입합니다.
  // SSR 되는 HTML 에 이미 올바른 유틸리티 내비게이션(로그인 전/후)이 들어가므로
  // 브라우저 하이드레이션 시 재렌더가 발생하지 않아 깜빡임이 제거됩니다.
  const session = await getSession();
  const initialUser = session
    ? {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        avatarUrl: session.avatarUrl ?? null,
      }
    : null;

  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col pt-20 pb-16 md:pb-0">
        <AuthProvider initialUser={initialUser}>
          <Header />
          <main className="flex-grow">{children}</main>
          <FloatingButton />
          <Footer />
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
