import React from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "원장 인사말 | CLS 에듀케이션",
  description:
    "CLS 에듀케이션 원장의 교육 철학과 진심 어린 인사말을 전합니다. 깊이 있는 이해, 따뜻한 마음, 함께하는 성장.",
};

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
            “공부가 외롭지 않도록, 결과가 두렵지 않도록
            <br className="hidden sm:block" /> 곁에서 함께 걷는 교육”
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Main Greeting Card */}
        <FadeIn direction="up" duration={800}>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Text Section */}
              <div className="lg:col-span-3 p-8 md:p-12 lg:p-16 order-2 lg:order-1">
                <p className="text-xs sm:text-sm font-semibold text-cls-orange tracking-[0.2em] mb-4">
                  CLS EDUCATION · GREETINGS
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-cls-black leading-tight mb-10 break-keep">
                  아이들의 꿈에 날개를 다는
                  <br />
                  <span className="text-cls-orange">진심의 교육</span>
                </h2>

                <p className="text-lg md:text-xl font-semibold text-cls-black mb-10 break-keep">
                  안녕하세요. CLS 에듀케이션 원장 OOO 입니다.
                </p>

                <div className="space-y-7 mb-12">
                  <div className="border-l-4 border-cls-orange pl-5 py-1">
                    <h3 className="text-lg md:text-xl font-bold text-cls-black mb-2">
                      깊이 있는 이해
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light break-keep">
                      단순한 지식 전달을 넘어, 아이들의 마음을 먼저 읽습니다.
                      <br className="hidden md:block" /> 성적 향상의 시작은 학생에 대한 깊은
                      공감에서 시작됩니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-cls-orange pl-5 py-1">
                    <h3 className="text-lg md:text-xl font-bold text-cls-black mb-2">
                      따뜻한 마음
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light break-keep">
                      지치고 힘든 수험 생활 속에서 CLS는 든든한 안식처가 됩니다.
                      <br className="hidden md:block" /> 아이들이 포기하지 않고 끝까지 걸을 수
                      있도록 따뜻하게 동행합니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-cls-orange pl-5 py-1">
                    <h3 className="text-lg md:text-xl font-bold text-cls-black mb-2">
                      함께하는 성장
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light break-keep">
                      데이터가 증명하는 실력과 진심이 담긴 관리가 만날 때,
                      <br className="hidden md:block" /> 우리 아이들은 비로소 스스로 빛나는
                      결과를 만들어냅니다.
                    </p>
                  </div>
                </div>

                <div className="text-right pr-2 md:pr-6 pt-6 border-t border-slate-100">
                  <span className="text-xl md:text-2xl font-semibold text-cls-black tracking-wide align-middle">
                    원장 OOO
                  </span>
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 ml-3 rounded-full border-2 border-red-700 text-red-700 text-xs font-bold align-middle"
                    aria-hidden="true"
                  >
                    印
                  </span>
                </div>
              </div>

              {/* Image / Visual Section */}
              <div className="lg:col-span-2 relative bg-gradient-to-br from-slate-100 to-slate-50 min-h-[360px] lg:min-h-full order-1 lg:order-2 overflow-hidden">
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
                <div
                  className="absolute bottom-0 left-0 w-32 h-24 lg:w-36 lg:h-28 bg-cls-black pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                  <div className="relative w-full max-w-[280px] lg:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex flex-col items-center justify-center text-slate-500">
                    <svg
                      className="w-20 h-20 mb-4 opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="text-sm font-medium">원장님 사진</p>
                    <p className="text-xs mt-1 opacity-70">(추후 등록 예정)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Quote Section */}
        <FadeIn direction="up" delay={150} duration={800}>
          <div className="bg-cls-black text-white rounded-3xl p-10 md:p-14 mt-16 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513258496099-481620b4cbdb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <svg
                className="w-10 h-10 text-cls-orange mx-auto mb-6 opacity-80"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p className="text-xl md:text-2xl font-light leading-relaxed break-keep">
                “부모님께서 안심하고 맡기실 수 있는 곳,
                <br className="hidden md:block" /> 아이들에게 좋은 시간으로 남는 곳 — CLS가 그
                자리를 지키겠습니다.”
              </p>
            </div>
          </div>
        </FadeIn>

        {/* CTA Cards */}
        <FadeIn direction="up" delay={250} duration={800}>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Link
              href="/about"
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-slate-100"
            >
              <p className="text-sm text-gray-400 mb-2">학원 소개</p>
              <h3 className="text-xl font-bold text-cls-black group-hover:text-cls-orange transition-colors flex items-center justify-between gap-2">
                CLS 에듀케이션 안내
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </h3>
            </Link>
            <Link
              href="/contact"
              className="group bg-cls-orange rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-sm text-white/80 mb-2">상담 예약</p>
              <h3 className="text-xl font-bold text-white flex items-center justify-between gap-2">
                지금 바로 상담 신청하기
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </h3>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
