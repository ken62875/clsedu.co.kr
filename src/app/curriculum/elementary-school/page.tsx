"use client";

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import SwipeCarousel from "@/components/ui/SwipeCarousel";

export default function ElementarySchoolCurriculum() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src="https://media.clsedu.co.kr/cls-elementary-students-joyfully-studying-in-a-classroom-16x9.jpg"
          alt="초등부 교과과정"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <FadeIn direction="up" duration={800}>
            <span className="inline-block py-1 px-3 rounded-full bg-cls-orange/20 text-cls-orange border border-cls-orange/30 text-xs md:text-sm font-bold mb-3 backdrop-blur-md">
              Elementary School
            </span>
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-6 tracking-tight drop-shadow-lg">
              초등부 교과과정
            </h1>
            <p className="text-sm md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              &quot;기초는 단단하게, 실력은 확실하게!<br />
              스스로 공부하는 힘을 기릅니다.&quot;
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">

        {/* 1. 학년별 운영 체계 */}
        <FadeIn direction="up" delay={100} duration={800}>
          <CollapsibleSection
            defaultOpen
            className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 md:p-12 mb-5 md:mb-8"
            title={
              <h2 className="text-lg md:text-3xl font-bold text-cls-black flex items-center gap-2 md:gap-3">
                <span className="w-1 md:w-1.5 h-6 md:h-8 bg-cls-orange rounded-full flex-shrink-0"></span>
                1. 학년별 운영 체계
              </h2>
            }
          >
            <div className="mt-4 md:mt-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg leading-relaxed">
                아이의 발달 단계에 맞춰 저학년부와 고학년부로 나눠 운영합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-cls-orange">저학년부 (1~3학년)</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">공부에 흥미를 붙이고, 올바른 공부 습관을 만듭니다.</p>
                </div>
                <div className="bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-cls-orange">고학년부 (4~6학년)</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">과목별 실력을 키우고, 중등 과정까지 이어지는 심화 학습을 합니다.</p>
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
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed">영어·수학·국과사를 균형 있게 배우며, 스스로 공부하는 힘을 키웁니다.</p>
            </div>

            <SwipeCarousel className="space-y-5 md:space-y-8">
              {/* English */}
              <div className="border-l-4 border-indigo-500 pl-4 md:pl-6 py-1 md:py-2 h-full">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-1">① 영어 (English)</h3>
                  <p className="text-indigo-600 font-medium text-xs md:text-sm">읽기·문법·어휘를 골고루, 매일 꾸준히</p>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>주요 영역:</strong> 읽기·문법·어휘를 함께 배우는 통합 학습</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <div className="text-gray-700 text-sm md:text-base">
                      <strong>사용 교재:</strong>
                      <ul className="mt-1 md:mt-2 ml-4 list-disc space-y-1 text-gray-600">
                        <li>브릭스 리딩(Bricks Reading): 수준별 읽기로 독해력 키우기</li>
                        <li>와츠 그래머(What&apos;s Grammar): 단계별로 문법 잡기</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>매일 단어 미션:</strong> 워드마스터·능률보카로 매일 단어를 외우며 스스로 공부하는 습관을 만듭니다.</p>
                  </li>
                </ul>
              </div>

              {/* Math */}
              <div className="border-l-4 border-teal-500 pl-4 md:pl-6 py-1 md:py-2 h-full">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-1">② 수학 (Mathematics)</h3>
                  <p className="text-teal-600 font-medium text-xs md:text-sm">맞춤 반복 학습으로 빈틈없는 실력</p>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>맞춤 지도:</strong> 기초부터 차근차근, 아이 수준에 맞춘 1:1 지도</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>반복의 힘:</strong> 확실히 이해할 때까지 반복하고, 시험으로 점검합니다.</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>기본기 훈련:</strong> 문제 풀이뿐 아니라 공부 습관까지 잡아 탄탄한 기초를 만듭니다.</p>
                  </li>
                </ul>
              </div>

              {/* Korean & Science & Social */}
              <div className="border-l-4 border-rose-500 pl-4 md:pl-6 py-1 md:py-2 h-full">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-1">③ 국어·과학·사회 통합</h3>
                  <p className="text-rose-600 font-medium text-xs md:text-sm">읽고 이해하는 힘을 키워 학교 수업이 쉬워지는 반</p>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>통합 학습:</strong> 국어·과학·사회 세 과목을 함께 효율적으로 배웁니다.</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>읽기 힘 키우기:</strong> 핵심 용어를 반복해 익히며 어휘력과 읽기 힘을 키웁니다.</p>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700 text-sm md:text-base"><strong>교과 밀착 관리:</strong> 학교 진도보다 한발 앞서 배워 학교 수업이 자신 있어집니다.</p>
                  </li>
                </ul>
              </div>
            </SwipeCarousel>
          </CollapsibleSection>
        </FadeIn>

        {/* 3. CLS 교육만의 강점 */}
        <FadeIn direction="up" delay={300} duration={800}>
          <CollapsibleSection
            chevronClassName="text-cls-orange"
            className="bg-gradient-to-br from-gray-900 to-cls-black-light text-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-12 mb-8 md:mb-12"
            title={
              <h2 className="text-lg md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-cls-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                3. CLS 교육만의 강점
              </h2>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-5 md:mt-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl hover:bg-white/20 transition-colors">
                <div className="bg-cls-orange w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">단과 및 종합반 운영</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  약한 과목만 골라 듣거나, 전 과목 종합반 중에서 선택할 수 있습니다.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl hover:bg-white/20 transition-colors">
                <div className="bg-cls-orange w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">밀착 생활 지도</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  공부뿐 아니라 &apos;공부 습관&apos;을 잡아 꾸준한 성적 향상을 돕습니다.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl hover:bg-white/20 transition-colors">
                <div className="bg-cls-orange w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">체계적인 교재 라인업</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  검증된 교재와 CLS만의 미션을 더해 학습 효과를 높입니다.
                </p>
              </div>
            </div>
          </CollapsibleSection>
        </FadeIn>

      </div>
    </div>
  );
}
