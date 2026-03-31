import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/ui/FloatingButton";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "CLS 에듀케이션",
  description: "진짜 실력은 속도가 아니라 깊이에서 나옵니다. 초중고 내신/입시 전문 보습학원",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col pt-20 pb-16 md:pb-0">
        <Header />
        <main className="flex-grow">{children}</main>
        <FloatingButton />
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
