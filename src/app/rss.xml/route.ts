import { prisma } from "@/lib/prisma";

const SITE_URL = "https://clsedu.co.kr";

// 1시간마다 갱신 (새 글이 주기적으로 피드에 반영됨)
export const revalidate = 3600;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let items = "";

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 30,
      select: {
        title: true,
        slug: true,
        summary: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    items = posts
      .map((p) => {
        const link = `${SITE_URL}/story/${encodeURIComponent(p.slug)}`;
        const date = (p.publishedAt ?? p.createdAt).toUTCString();
        const desc = p.summary ?? "";
        return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${date}</pubDate>
      <description>${esc(desc)}</description>
    </item>`;
      })
      .join("\n");
  } catch {
    // DB 접근 실패 시에도 빈 피드를 정상 반환 (500 방지)
    items = "";
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CLS 에듀케이션 스토리</title>
    <link>${SITE_URL}/story</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>중랑구 신내동 CLS 에듀케이션의 교육 칼럼과 학원 소식</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
