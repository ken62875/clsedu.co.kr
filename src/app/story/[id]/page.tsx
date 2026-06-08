import React, { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import ShareButtons from "@/components/ui/ShareButtons";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import { BOOKING_URL } from "@/lib/booking";

const SITE_URL = "https://clsedu.co.kr";

interface BlogTag { id: string; name: string; slug: string; }
interface BlogCategory { id: string; name: string; slug: string; }
interface BlogAuthor { id: string; name: string; }
interface BlogPostDetail {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  contentHtml: string | null;
  featuredImageUrl: string | null;
  ogImageUrl: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  author: BlogAuthor;
  category: BlogCategory | null;
  tags: { tag: BlogTag }[];
}

// cache()로 감싸 generateMetadata와 페이지 렌더에서 DB를 한 번만 조회
const fetchPost = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  // Next.js params가 인코딩된 상태로 올 수 있어 안전하게 디코딩
  const decodedSlug = decodeURIComponent(slug);

  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { id: decodedSlug },
          { slug: decodedSlug },
        ],
      },
      include: {
        author: { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    });

    // status 체크를 DB 쿼리 밖에서 수행 (enum 비교 이슈 방지)
    if (!post || post.status !== "PUBLISHED") {
      console.error(`[Story] 포스트 없음 또는 미발행: slug="${decodedSlug}", status="${post?.status}"`);
      return null;
    }

    return post as BlogPostDetail;
  } catch (err) {
    console.error(`[Story] Prisma 오류: slug="${decodedSlug}"`, err);
    return null;
  }
});

// ─── 글별 메타데이터 (카톡/SNS 공유 시 제목·이미지 미리보기) ────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) return { title: "글을 찾을 수 없습니다" };

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription ||
    post.summary ||
    "CLS 에듀케이션 스토리 — 중랑구 신내동 내신·입시 학원";
  const image = post.ogImageUrl || post.featuredImageUrl || undefined;
  const url = `${SITE_URL}/story/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "CLS 에듀케이션",
      locale: "ko_KR",
      images: image ? [{ url: image }] : undefined,
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) notFound();

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric",
      })
    : new Date(post.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric",
      });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.summary,
    image: post.featuredImageUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "CLS 에듀케이션",
      logo: { "@type": "ImageObject", url: "https://clsedu.co.kr/logo-clsedu-landscape.webp" },
    },
    keywords: post.keywords,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://clsedu.co.kr/story/${post.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-white pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn direction="up">
            <div className="mb-8">
              <Link href="/story" className="inline-flex items-center text-sm font-medium text-cls-blue hover:text-blue-800 mb-6 transition-colors">
                ← 목록으로 돌아가기
              </Link>
              <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500 mb-4">
                {post.category && (
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-cls-blue font-semibold">
                    {post.category.name}
                  </span>
                )}
                <span>{publishDate}</span>
                <span>•</span>
                <span>{post.author.name}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-cls-black leading-tight mb-6">
                {post.title}
              </h1>
              {post.summary && (
                <p className="text-lg text-gray-500 font-light leading-relaxed">{post.summary}</p>
              )}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map(({ tag }) => (
                    <span key={tag.id} className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.05} direction="up">
            <div className="mb-10 pb-6 border-b border-gray-100">
              <ShareButtons url={`${SITE_URL}/story/${post.slug}`} title={post.title} />
            </div>
          </FadeIn>

          {post.featuredImageUrl && (
            <FadeIn delay={0.1} direction="up">
              <div className="w-full aspect-[21/9] md:aspect-[16/9] relative rounded-2xl overflow-hidden mb-12 bg-slate-50 border border-slate-100">
                <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.2} direction="up">
            <div className="prose prose-lg max-w-none text-gray-700">
              {post.contentHtml ? (
                <div className="mt-8 story-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.contentHtml) }} />
              ) : (
                <p className="text-gray-400 italic">콘텐츠가 없습니다.</p>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
              <Link href="/story" className="px-6 py-3 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                목록으로
              </Link>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-cls-blue text-white hover:bg-blue-700 rounded-lg font-medium transition-colors">
                상담 문의하기
              </a>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
