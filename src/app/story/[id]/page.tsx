import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  contentHtml?: string;
  featuredImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
  status: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  author: { id: string; name: string };
  category?: { id: string; name: string; slug: string } | null;
  tags: { tag: { id: string; name: string; slug: string } }[];
}

async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.post;
  } catch {
    return null;
  }
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const post = await fetchPost(id);

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric",
      })
    : new Date(post.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric",
      });

  // JSON-LD 구조화 데이터 생성 (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.summary,
    image: post.featuredImageUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.publishedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "CLS 에듀케이션",
      logo: {
        "@type": "ImageObject",
        url: "https://clsedu.co.kr/logo-clsedu-landscape.webp",
      },
    },
    keywords: post.keywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://clsedu.co.kr/story/${post.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn direction="up">
            <div className="mb-8">
              <Link
                href="/story"
                className="inline-flex items-center text-sm font-medium text-cls-blue hover:text-blue-800 mb-6 transition-colors"
              >
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
                <p className="text-lg text-gray-500 font-light leading-relaxed">
                  {post.summary}
                </p>
              )}
              {/* 태그 */}
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

          {post.featuredImageUrl && (
            <FadeIn delay={0.1} direction="up">
              <div className="w-full aspect-[21/9] md:aspect-[16/9] relative rounded-2xl overflow-hidden mb-12 bg-slate-50 border border-slate-100">
                <img
                  src={post.featuredImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.2} direction="up">
            <div className="prose prose-lg max-w-none text-gray-700">
              {post.contentHtml ? (
                <div
                  className="mt-8 story-content"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              ) : (
                <p className="text-gray-400 italic">콘텐츠가 없습니다.</p>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <div className="mt-16 pt-8 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <Link
                  href="/story"
                  className="px-6 py-3 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  목록으로
                </Link>

                <Link
                  href="/contact"
                  className="px-6 py-3 bg-cls-blue text-white hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  상담 문의하기
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
