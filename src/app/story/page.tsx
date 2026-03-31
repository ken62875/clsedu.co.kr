import React from "react";
import Image from "next/image";
import Link from "next/link";
import { mockStories } from "@/data/mockStoryData";
import { Pagination } from "@/components/ui/Pagination";
import FadeIn from "@/components/ui/FadeIn";

const ITEMS_PER_PAGE = 20;

export default async function StoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams?.page;
  const currentPage = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  
  // Calculate pagination variables
  const totalItems = mockStories.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Safety bounds
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const currentStories = mockStories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

        {currentStories.length > 0 ? (
          <>
            {/* Grid display: 2 cols on mobile, 4 cols on PC */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {currentStories.map((story, i) => (
                <FadeIn key={story.id} delay={i * 0.05} direction="up">
                  <Link href={`/story/${story.id}`} className="group block h-full">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-slate-100">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                        {/* Using standard img or next/Image if domains are properly configured. Unsplash needs domains, so sticking to standard img for mock or remote patterns. Next Image is preferred. */}
                        <img 
                          src={story.imgUrl} 
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 md:p-5 flex-grow flex flex-col">
                        <div className="text-xs text-cls-blue font-medium mb-2">{story.category}</div>
                        <h2 className="text-sm md:text-base font-bold text-cls-black mb-2 line-clamp-2 md:leading-tight">
                          {story.title}
                        </h2>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">
                          {story.summary}
                        </p>
                        <div className="text-xs text-gray-400 flex items-center justify-between mt-auto">
                          <span>{story.date}</span>
                          <span>{story.author}</span>
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
