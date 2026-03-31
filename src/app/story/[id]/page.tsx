import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockStories } from "@/data/mockStoryData";
import FadeIn from "@/components/ui/FadeIn";

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const story = mockStories.find((s) => s.id === id);

  if (!story) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn direction="up">
          <div className="mb-8">
            <Link 
              href="/story" 
              className="inline-flex items-center text-sm font-medium text-cls-blue hover:text-blue-800 mb-6 transition-colors"
            >
              &larr; 목록으로 돌아가기
            </Link>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="bg-slate-100 px-3 py-1 rounded-full text-cls-blue font-semibold">
                {story.category}
              </span>
              <span>{story.date}</span>
              <span>•</span>
              <span>{story.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-cls-black leading-tight mb-6">
              {story.title}
            </h1>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {story.summary}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} direction="up">
          <div className="w-full aspect-[21/9] md:aspect-[16/9] relative rounded-2xl overflow-hidden mb-12 bg-slate-50 border border-slate-100">
            <img
              src={story.imgUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Real implementation would parse markdown or MDX or use dangerouslySetInnerHTML safely for CMS content */}
            <div 
              className="mt-8 story-content"
              dangerouslySetInnerHTML={{ __html: story.content }} 
            />
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
  );
}
