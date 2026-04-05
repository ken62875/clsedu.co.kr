import React from "react";
import Link from "next/link";
import { Pagination } from "@/components/ui/Pagination";
import FadeIn from "@/components/ui/FadeIn";

const ITEMS_PER_PAGE = 20;
// 서버 컴포넌트이므로 BACKEND_API_URL(서버 전용) 사용, 없으면 운영 주소로 폴백
const API_BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://app.clsedu.co.kr";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  featuredImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
  status: string;
  author: { id: string; name: string };
  category?: { id: string; name: string; slug: string } | null;
  tags: { tag: { id: string; name: string; slug: string } }[];
}

async function fetchPosts(page: number): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/blog/posts?page=${page}&limit=${ITEMS_PER_PAGE}&status=PUBLISHED`,
      { cache: "no-store" }
    );
    if (!res.ok) return { posts: [], total: 0 };
    return await res.json();
  } catch {
    return { posts: [], total: 0 };
  }
}

export default async function StoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams?.page;
  const currentPage = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  const { posts, total } = await fetchPosts(currentPage);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-0 max-w-6xl">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-cls-black mb-4">CLS 스토리</h1>
            <p className="text-gray-500 font-light">
              CLS 교육 시스템의 생생한 현장 소식과 교육 칼럼을 전합니다.
            </p>
          </div>
        </FadeIn>

        {posts.length > 0 ? (
          <>
            {/* Grid display: 2 cols on mobile, 4 cols on PC */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {posts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.05} direction="up">
                  <Link href={`/story/${post.slug}`} className="group block h-full">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-slate-100">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                        {post.featuredImageUrl ? (
                          <img
                            src={post.featuredImageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4 md:p-5 flex-grow flex flex-col">
                        {post.category && (
                          <div className="text-xs text-cls-blue font-medium mb-2">{post.category.name}</div>
                        )}
                        <h2 className="text-sm md:text-base font-bold text-cls-black mb-2 line-clamp-2 md:leading-tight">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">
                            {post.summary}
                          </p>
                        )}
                        <div className="text-xs text-gray-400 flex items-center justify-between mt-auto">
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("ko-KR")
                              : new Date(post.createdAt).toLocaleDateString("ko-KR")}
                          </span>
                          <span>{post.author.name}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2} direction="up">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                basePath="/story"
              />
            </FadeIn>
          </>
        ) : (
          <div className="py-20 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-slate-100">
            게시물이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
