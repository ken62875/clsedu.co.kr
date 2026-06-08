import type { MetadataRoute } from "next";

const BASE_URL = "https://clsedu.co.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 비공개·기능성 경로는 검색 수집에서 제외
      disallow: ["/my-account/", "/login", "/signup", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
