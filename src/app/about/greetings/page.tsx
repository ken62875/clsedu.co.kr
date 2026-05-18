import React from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "원장 인사말 | CLS 에듀케이션",
  description:
    "CLS 에듀케이션 원장의 교육 철학과 진심 어린 인사말을 전합니다. 깊이 있는 이해, 따뜻한 마음, 함께하는 성장.",
};

const DIRECTOR_PHOTO_URL =
  "https://media.clsedu.co.kr/%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF-%E1%84%8E%E1%85%AC%E1%84%80%E1%85%B3%E1%86%B7%E1%84%85%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%82%E1%85%B5%E1%86%B702-800.jpeg";

export default function GreetingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Visual Header */}
      <div className="relative bg-cls-black py-24 md:py-32 text-center mt-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transform scale-105"
          style={{
            backgroundImage:
              "url('https://media.clsedu.co.kr/hero-01-clsedu-main-building-rebuild-optimized.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cls-black/60 to-cls-black/20" />

        <div className="relative z-10 px-4">
          <p className="text-xs md:text-sm text-cls-orange font-semibold tracking-widest uppercase mb-4 drop-shadow-md">
            About &gt; 원장 인사말
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-md">
            원장 <span className="text-cls-orange">인사말</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md break-keep">
            &ldquo;공부가 외롭지 않도록, 결과가 두렵지 않도록
            <br className="hidden sm:block" /> 곁에서 함께 걷는 교육&rdquo;
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Main Greeting Card */}
        <FadeIn direction="up" duration={800}>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Text Section */}
              <div className="lg:col-span-3 p-6 pb-3 md:p-12 md:pb-3 lg:p-16 lg:pb-3">
                <p className="text-xs font-semibold text-cls-orange tracking-[0.2em] mb-3">
                  CLS EDUCATION · GREETINGS
                </p>
                <h2 className="font-bold text-cls-black leading-tight mb-4 md:mb-10 break-keep whitespace-nowrap">
                  <span className="block text-xl md:text-4xl lg:text-[2.75rem]">아이들의 꿈에 날개를 다는</span>
                  <span className="block text-2xl md:text-5xl lg:text-[3.25rem] text-cls-orange">진심의 교육</span>
                </h2>

                {/* 모바일 전용 사진 */}
                <div className="lg:hidden mb-5 flex justify-center">
                  <div className="relative w-full max-w-[260px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-slate-200">
                    <Image
                      src={DIRECTOR_PHOTO_URL}
                      alt="CLS 에듀케이션 대표원장 최금란"
                      fill
                      sizes="260px"
                      className="object-cover"
                      unoptimized
                      priority
                    />
                  </div>
                </div>

                <p className="text-sm md:text-xl font-semibold text-cls-black mb-5 md:mb-10 break-keep">
                  안녕하세요. CLS 에듀케이션 원장 최금란 입니다.
                </p>

                <div className="space-y-4 md:space-y-7 mb-5">
                  <div className="border-l-4 border-cls-orange pl-4 py-1">
                    <h3 className="text-sm md:text-xl font-bold text-cls-black mb-1 md:mb-2">
                      깊이 있는 이해
                    </h3>
                    <p className="text-xs md:text-base text-gray-600 leading-relaxed font-light break-keep">
                      단순한 지식 전달을 넘어, 아이들의 마음을 먼저 읽습니다.
                      <br className="hidden md:block" /> 성적 향상의 시작은 학생에 대한 깊은
                      공감에서 시작됩니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-cls-orange pl-4 py-1">
                    <h3 className="text-sm md:text-xl font-bold text-cls-black mb-1 md:mb-2">
                      따뜻한 마음
                    </h3>
                    <p className="text-xs md:text-base text-gray-600 leading-relaxed font-light break-keep">
                      지치고 힘든 수험 생활 속에서 CLS는 든든한 안식처가 됩니다.
                      <br className="hidden md:block" /> 아이들이 포기하지 않고 끝까지 걸을 수
                      있도록 따뜻하게 동행합니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-cls-orange pl-4 py-1">
                    <h3 className="text-sm md:text-xl font-bold text-cls-black mb-1 md:mb-2">
                      함께하는 성장
                    </h3>
                    <p className="text-xs md:text-base text-gray-600 leading-relaxed font-light break-keep">
                      데이터가 증명하는 실력과 진심이 담긴 관리가 만날 때,
                      <br className="hidden md:block" /> 우리 아이들은 비로소 스스로 빛나는
                      결과를 만들어냅니다.
                    </p>
                  </div>
                </div>

                <div className="text-right pr-2 md:pr-10 pt-3 pb-0 border-t border-slate-100">
                  <Image
                    src="/director-stamp-sign.png"
                    alt="원장 최금란"
                    width={320}
                    height={120}
                    className="inline-block w-32 md:w-48"
                    unoptimized
                  />
                </div>
              </div>

              {/* Image / Visual Section (데스크톱 전용) */}
              <div className="hidden lg:block lg:col-span-2 relative bg-gradient-to-br from-slate-100 to-slate-50 lg:min-h-full overflow-hidden">
                <span
                  className="absolute -top-6 right-2 text-7xl lg:text-9xl font-black text-slate-200/80 select-none pointer-events-none tracking-tighter"
                  aria-hidden="true"
                >
                  CLS
                </span>
                <div
                  className="absolute right-6 top-12 w-[78%] h-[78%] bg-cls-orange/10 rounded-3xl pointer-events-none hidden md:block"
                  aria-hidden="true"
                />

                <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                  <div className="relative w-full max-w-[280px] lg:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                    <Image
                      src={DIRECTOR_PHOTO_URL}
                      alt="CLS 에듀케이션 대표원장 최금란"
                      fill
                      sizes="(max-width: 1024px) 280px, 384px"
                      className="object-cover"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Quote Section — 다크 인용구 카드 */}
        <div className="relative rounded-3xl overflow-hidden mt-10 md:mt-16 shadow-2xl bg-cls-black">
          <div className="px-8 py-12 md:px-16 md:py-16">
            {/* 상단 타이틀 */}
            <FadeIn direction="up" delay={0} duration={700}>
              <div className="mb-10 md:mb-14">
                <p className="text-[0.65rem] tracking-[0.45em] text-white/35 uppercase mb-3">
                  CLS Education
                </p>
                <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-wide leading-snug whitespace-nowrap">
                  우리가 지키는 <span className="font-semibold text-cls-orange">약속</span>
                </h2>
                <div className="mt-5 h-px w-12 bg-cls-orange" />
              </div>
            </FadeIn>

            {/* 본문 텍스트 순차 페이드인 */}
            <div className="space-y-3 md:space-y-5 mb-10 md:mb-14 max-w-2xl">
              <FadeIn direction="up" delay={200} duration={700}>
                <p className="text-lg md:text-2xl font-light text-white/85 leading-relaxed break-keep">
                  부모님께서 안심하고 맡기실 수 있는 곳
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={400} duration={700}>
                <p className="text-lg md:text-2xl font-light text-white/85 leading-relaxed break-keep">
                  아이들에게 좋은 시간으로 남는 곳
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={600} duration={700}>
                <p className="text-base md:text-2xl font-bold text-cls-orange leading-relaxed whitespace-nowrap pt-1">
                  CLS 에듀케이션이 그 자리를 지키겠습니다
                </p>
              </FadeIn>
            </div>

            {/* 하단 구분선 + 서명 */}
            <FadeIn direction="up" delay={800} duration={700}>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/15" />
                <p className="text-xs text-gray-500 tracking-widest uppercase shrink-0">
                  CLS Education · 원장 최금란
                </p>
                <div className="h-px flex-1 bg-white/15" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
