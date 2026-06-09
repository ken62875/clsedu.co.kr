import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import FloatingButton from "@/components/ui/FloatingButton"; // 일단 숨김
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { AuthProvider } from "@/providers/AuthProvider";
import { getSession } from "@/lib/auth";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clsedu.co.kr"),
  title: {
    default: "CLS 에듀케이션 | 중랑구 신내동 내신·입시 학원",
    template: "%s | CLS 에듀케이션 (중랑구·신내동)",
  },
  description:
    "서울 중랑구 신내동 초·중·고 내신·입시 전문 보습학원 CLS에듀케이션. 국어·영어·수학·과학 단과 및 종합반 운영. 학생 개별 맞춤 관리.",
  keywords: [
    "중랑구 학원", "신내동 학원", "중랑구 영어학원", "신내동 수학학원",
    "중랑구 입시학원", "중랑구 고등학원", "신내동 내신학원", "CLS에듀케이션",
  ],
  alternates: {
    canonical: "https://clsedu.co.kr",
    types: { "application/rss+xml": "https://clsedu.co.kr/rss.xml" },
  },
  verification: {
    other: {
      "naver-site-verification": "e3d2fbea793b9b4901e0b8dc98a754ad8b86444a",
    },
  },
  openGraph: {
    title: "CLS 에듀케이션 | 중랑구 신내동 내신·입시 학원",
    description: "중랑구 신내동 초·중·고 내신·입시 전문 보습학원",
    url: "https://clsedu.co.kr",
    siteName: "CLS 에듀케이션",
    type: "website",
    locale: "ko_KR",
  },
};

// 검색엔진에 "학원(EducationalOrganization)"으로 강하게 분류시키는 구조화 데이터
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "CLS 에듀케이션",
  description: "중랑구 신내동 초·중·고 내신·입시 전문 보습학원",
  url: "https://clsedu.co.kr",
  telephone: "02-493-8899",
  address: {
    "@type": "PostalAddress",
    streetAddress: "봉화산로 218 영창빌딩 7층 (신내동)",
    addressLocality: "중랑구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  areaServed: ["서울 중랑구", "신내동", "신내역"],
  openingHours: "Mo-Sa 14:00-22:00",
  logo: "https://clsedu.co.kr/logo-clsedu-landscape.webp",
  image: "https://clsedu.co.kr/logo-clsedu-landscape.webp",
  // 공식 채널 — 네이버/구글이 "이 학원의 공식 채널"로 연결 인식 (브랜드 검색 시 소셜 아이콘 노출에 도움)
  sameAs: [
    "https://blog.naver.com/clsjn",
    "https://map.naver.com/p/entry/place/1381304977",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <AuthProvider initialUser={initialUser}>
          <Header />
          <main className="flex-grow">{children}</main>
          {/* <FloatingButton /> 일단 숨김 */}
          <Footer />
          <MobileBottomNav />
        </AuthProvider>
      </body>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
