"use client";

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import SwipeCarousel from "@/components/ui/SwipeCarousel";

export default function MiddleSchoolCurriculum() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src="https://media.clsedu.co.kr/cls-middle-young-students-studying-in-a-classroom-16x9.jpg"
          alt="중등부 교과과정"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <FadeIn direction="up" duration={800}>
            <span className="inline-block py-1 px-3 rounded-full bg-cls-orange/20 text-cls-orange border border-cls-orange/30 text-xs md:text-sm font-bold mb-3 backdrop-blur-md">
              Middle School
            </span>
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-6 tracking-tight drop-shadow-lg">
              중등부 교과과정
            </h1>
            <p className="text-sm md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              &quot;내신은 완벽하게, 수능은 앞서가게!<br />
              마음을 움직여 스스로 공부하는 힘을 기릅니다.&quot;
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">

        {/* 1. 학년별 및 수준별 운영 체계 */}
        <FadeIn direction="up" delay={100} duration={800}>
          <CollapsibleSection
            defaultOpen
            className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 md:p-12 mb-5 md:mb-8"
            title={
              <h2 className="text-lg md:text-3xl font-bold text-cls-black flex items-center gap-2 md:gap-3">
                <span className="w-1 md:w-1.5 h-6 md:h-8 bg-cls-orange rounded-full flex-shrink-0"></span>
                1. 학년별 및 수준별 운영 체계
              </h2>
            }
          >
            <div className="mt-4 md:mt-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg leading-relaxed">
                학년별 공통 과정과 수준별 특화 과정을 이원화해 운영합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-cls-orange">학년별 공통 과정</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">학교별 출판사에 맞춘 철저한 내신 대비 및 수행평가 밀착 관리.</p>
                </div>
                <div className="bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-cls-orange">수준별 특화 과정</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">성취도에 따라 <strong>[심화반]</strong>·<strong>[내신 집중반]</strong>으로 편성해 고등 진학을 미리 준비합니다.</p>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </FadeIn>

        {/* 2. 과목별 상세 커리큘럼 */}
        <FadeIn direction="up" delay={200} duration={800}>
          <CollapsibleSection
            className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 md:p-12 mb-5 md:mb-8"
            title={
              <h2 className="text-lg md:text-3xl font-bold text-cls-black flex items-center gap-2 md:gap-3">
                <span className="w-1 md:w-1.5 h-6 md:h-8 bg-cls-orange rounded-full flex-shrink-0"></span>
                2. 과목별 상세 커리큘럼
              </h2>
            }
          >
            <div className="mt-3 md:mt-4 mb-6 md:mb-10">
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed">주요 과목의 깊이 있는 학습과 탐구 과목의 효율적인 시간 배분으로 학습 밸런스를 완성합니다.</p>
            </div>

            <SwipeCarousel className="space-y-5 md:space-y-8">
              {/* English */}
              <div className="border-l-4 border-indigo-500 pl-4 md:pl-6 py-1 md:py-2 h-full">
                <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">① 영어 (English)</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>읽기 (Reading):</strong> 리딩튜터 교재로 영어 글을 정확히 읽고 이해하는 힘을 키웁니다.</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>문법 (Grammar):</strong> 그래머 와이즈 교재로 문법을 탄탄히 잡고 서술형 시험도 대비합니다.</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>단어 (Vocabulary):</strong> 워드마스터·능률보카로 매일 단어 외우는 습관을 만듭니다.</p>
                  </li>
                </ul>
              </div>

              {/* Math */}
              <div className="border-l-4 border-teal-500 pl-4 md:pl-6 py-1 md:py-2 h-full">
                <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">② 수학 (Mathematics)</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>1:1 맞춤 지도:</strong> 기초부터 차근차근, 학생 수준에 맞춰 모르는 부분을 채워 줍니다.</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>반복 학습:</strong> 개념을 확실히 이해할 때까지 반복하고, 시험으로 실력을 점검합니다.</p>
                  </li>
                </ul>
              </div>

              {/* Korean & Science */}
              <div className="border-l-4 border-rose-500 pl-4 md:pl-6 py-1 md:py-2 h-full">
                <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">③ 국어 &amp; 과학 (Korean &amp; Science)</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>주 1회 집중 수업:</strong> 영어·수학에 치우치지 않게 국어와 과학도 함께 챙겨, 읽고 생각하는 힘을 키웁니다.</p>
                  </li>
                </ul>
              </div>
            </SwipeCarousel>
          </CollapsibleSection>
        </FadeIn>

        {/* 3 & 4 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-5 md:mb-8">
          {/* 강점 */}
          <FadeIn direction="up" delay={300} duration={800}>
            <CollapsibleSection
              chevronClassName="text-cls-orange"
              className="bg-gradient-to-br from-gray-900 to-cls-black-light text-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-10 h-full"
              title={
                <h2 className="text-base md:text-2xl font-bold flex items-center gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-cls-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  3. CLS만의 독보적 강점
                </h2>
              }
            >
              <p className="text-cls-orange mt-4 md:mt-6 mb-4 md:mb-6 font-semibold bg-white/10 p-3 md:p-4 rounded-xl border border-white/20 text-sm md:text-base">
                &quot;공부하고 싶은 마음, 그 의지를 먼저 일깨웁니다.&quot;
              </p>
              <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                CLS는 지식만 가르치지 않고, <strong>학생의 마음을 먼저</strong> 돌봅니다.
              </p>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cls-orange mt-2 flex-shrink-0" />
                  <p className="text-gray-200 text-sm md:text-base"><strong>정기 상담:</strong> 학생의 고민을 듣고 함께 풀어갑니다.</p>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cls-orange mt-2 flex-shrink-0" />
                  <p className="text-gray-200 text-sm md:text-base"><strong>동기 부여:</strong> 칭찬과 격려로 &apos;나도 해보고 싶다&apos;는 마음을 스스로 갖게 합니다.</p>
                </li>
              </ul>
            </CollapsibleSection>
          </FadeIn>

          {/* 클리닉 */}
          <FadeIn direction="up" delay={400} duration={800}>
            <CollapsibleSection
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 md:p-10 h-full"
              title={
                <h2 className="text-base md:text-2xl font-bold text-cls-black flex items-center gap-2 md:gap-3">
                  <span className="w-1 md:w-1.5 h-6 md:h-8 bg-cls-orange rounded-full flex-shrink-0"></span>
                  4. 특별 클리닉 프로그램
                </h2>
              }
            >
              <div className="mt-4 md:mt-6 mb-5 md:mb-8">
                <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-2">① 영어 클리닉 (English Clinic)</h3>
                <p className="text-cls-orange text-xs md:text-sm mb-2 md:mb-3 font-medium">&quot;기초부터 다시, 자신감을 되찾는 수업&quot;</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">기초가 부족한 학생을 위한 수업입니다. 학년과 상관없이 기초부터 차근차근, 학교 수업도 함께 따라가 자신감을 키웁니다.</p>
              </div>

              <div>
                <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-2">② 클리닉 플러스 (Clinic Plus)</h3>
                <p className="text-cls-orange text-xs md:text-sm mb-2 md:mb-3 font-medium">&quot;1:1 밀착 관리로 확실한 실력 향상&quot;</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">정규 수업 외 1:1 밀착 지도로, 부족한 기초를 채우거나 더 높은 레벨로 끌어올립니다.</p>
              </div>
            </CollapsibleSection>
          </FadeIn>
        </div>

        {/* 5. 수업 구조 및 운영 방식 */}
        <FadeIn direction="up" delay={500} duration={800}>
          <CollapsibleSection
            className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 md:p-12 mb-8 md:mb-12"
            title={
              <h2 className="text-lg md:text-3xl font-bold text-cls-black flex items-center gap-2 md:gap-3">
                <span className="w-1 md:w-1.5 h-6 md:h-8 bg-cls-orange rounded-full flex-shrink-0"></span>
                5. 수업 구조 및 운영 방식
              </h2>
            }
          >
            <div className="overflow-x-auto mt-4 md:mt-6 mb-5 md:mb-8">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200">
                    <th className="py-3 px-4 md:py-4 md:px-6 font-bold text-gray-800 text-sm md:text-base w-1/3">구분</th>
                    <th className="py-3 px-4 md:py-4 md:px-6 font-bold text-gray-800 text-sm md:text-base w-1/3">수업 구성</th>
                    <th className="py-3 px-4 md:py-4 md:px-6 font-bold text-gray-800 text-sm md:text-base w-1/3">운영 특징</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 md:py-4 md:px-6 font-semibold text-gray-800 text-sm md:text-base">정규반 A</td>
                    <td className="py-3 px-4 md:py-4 md:px-6 text-gray-600 text-sm md:text-base">월 / 수 (+클리닉)</td>
                    <td className="py-3 px-4 md:py-4 md:px-6 text-gray-600 text-sm md:text-base" rowSpan={2} style={{ verticalAlign: 'middle', borderLeft: '1px solid #f3f4f6' }}>
                      <ul className="space-y-1 md:space-y-2">
                        <li className="flex items-center gap-1 md:gap-2"><svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-cls-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 단과 및 종합반 선택 가능</li>
                        <li className="flex items-center gap-1 md:gap-2"><svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-cls-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 학생별 맞춤형 밀착 생활 지도</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 md:py-4 md:px-6 font-semibold text-gray-800 text-sm md:text-base">정규반 B</td>
                    <td className="py-3 px-4 md:py-4 md:px-6 text-gray-600 text-sm md:text-base">화 / 목 (+클리닉)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-orange-50/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-orange-100 text-center">
              <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                CLS는 탄탄한 교재와 따뜻한 교감을 바탕으로, 단순한 성적 향상을 넘어 학생의 인생에 좋은 변화를 만드는 교육을 지향합니다.
              </p>
            </div>
          </CollapsibleSection>
        </FadeIn>

      </div>
    </div>
  );
}
