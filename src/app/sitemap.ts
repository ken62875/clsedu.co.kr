import type { MetadataRoute } from "next";

const BASE_URL = "https://clsedu.co.kr";

// 검색엔진에 노출할 주요(공개) 페이지 목록
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/greetings", priority: 0.6, changeFrequency: "monthly" },
  { path: "/curriculum", priority: 0.9, changeFrequency: "monthly" },
  { path: "/curriculum/elementary-school", priority: 0.8, changeFrequency: "monthly" },
  { path: "/curriculum/middle-school", priority: 0.8, changeFrequency: "monthly" },
  { path: "/curriculum/high-school", priority: 0.8, changeFrequency: "monthly" },
  { path: "/curriculum/special-program", priority: 0.7, changeFrequency: "weekly" },
  { path: "/program", priority: 0.8, changeFrequency: "monthly" },
  { path: "/teachers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/story", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
