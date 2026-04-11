"use client";

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function ElementarySchoolCurriculum() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="https://media.clsedu.co.kr/cls-elementary-students-joyfully-studying-in-a-classroom-16x9.jpg"
          alt="초등부 교과과정"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20 md:pt-32">
          <FadeIn direction="up" duration={800}>
            <span className="inline-block py-1 px-3 rounded-full bg-cls-orange/20 text-cls-orange border border-cls-orange/30 text-sm font-bold mb-4 backdrop-blur-md">
              Elementary School
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              초등부 교과과정
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              &quot;기초는 단단하게, 실력은 확실하게!<br />
              스스로 공부하는 힘을 기릅니다.&quot;
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        
        {/* 1. 학년별 운영 체계 */}
        <FadeIn direction="up" delay={100} duration={800}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cls-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-cls-orange rounded-full"></span>
              1. 학년별 운영 체계
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              아이들의 인지 발달 수준에 맞추어 저학년부와 고학년부로 이원화하여 운영합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-cls-orange">저학년부 (1~3학년)</h3>
                <p className="text-gray-600 leading-relaxed">학습에 대한 흥미 유발 및 올바른 공부 습관 형성</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-cls-orange">고학년부 (4~6학년)</h3>
                <p className="text-gray-600 leading-relaxed">교과별 전문성 강화 및 중등 과정 연계를 위한 심화 학습</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 2. 과목별 상세 커리큘럼 */}
        <FadeIn direction="up" delay={200} duration={800}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-cls-black mb-4 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-cls-orange rounded-full"></span>
                2. 과목별 상세 커리큘럼
              </h2>
            </div>

            <div className="space-y-8">
              {/* English */}
              <div className="border-l-4 border-indigo-500 pl-6 py-2">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">① 영어 (English)</h3>
                  <p className="text-indigo-600 font-medium text-sm">영역별 균형 잡힌 학습과 매일 지속되는 루틴</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>주요 영역:</strong> Reading(독해), Grammar(문법), Vocabulary(어휘) 중심의 통합 학습</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <div className="text-gray-700">
                      <strong>사용 교재:</strong>
                      <ul className="mt-2 ml-4 list-disc space-y-1 text-gray-600">
                        <li>Bricks Reading(브릭스 리딩): 수준별 리딩으로 독해력 확장</li>
                        <li>What's Grammar(와츠 그래머): 단계별 문법 체계 정립</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>CLS Daily Mission:</strong> 워드마스터 / 능률보카를 활용한 어휘 테스트 및 매일 미션을 통해 자기주도적 학습 습관을 완성합니다.</p>
                  </li>
                </ul>
              </div>

              {/* Math */}
              <div className="border-l-4 border-teal-500 pl-6 py-2">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">② 수학 (Mathematics)</h3>
                  <p className="text-teal-600 font-medium text-sm">학생 맞춤형 반복 학습으로 구멍 없는 실력 완성</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>맞춤형 교육:</strong> 기초부터 심화까지 학생의 이해도에 맞춘 1:1 눈높이 지도</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>반복의 힘:</strong> 개념 이해가 완벽해질 때까지 반복 학습 및 시험 컨셉의 평가를 통한 실전 감각 익히기</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>기본기 훈련:</strong> 단순 문제 풀이를 넘어, 학습 습관 자체를 교정하여 탄탄한 수학적 기반을 마련합니다.</p>
                  </li>
                </ul>
              </div>

              {/* Korean & Science */}
              <div className="border-l-4 border-rose-500 pl-6 py-2">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">③ 국과사 통합과정 (Total Humanities & Science)</h3>
                  <p className="text-rose-600 font-medium text-sm">문해력 결핍을 해소하고 학교 수업의 자신감을 높이는 반</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>통합 교육:</strong> 국어, 과학, 사회 세 과목을 전략적으로 학습하는 효율적인 커리큘럼</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>문해력 강화:</strong> 학생들의 가장 큰 고민인 어휘력과 문해력 부족을 해결하기 위해 용어 중심의 반복 학습 진행</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>교과 밀착 관리:</strong> 학교 수업 진도보다 한발 앞선 학습과 꼼꼼한 용어 정리를 통해 학교 수업에서 주도권을 잡을 수 있도록 지도합니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3. CLS 교육만의 강점 */}
        <FadeIn direction="up" delay={300} duration={800}>
          <div className="bg-gradient-to-br from-gray-900 to-cls-black-light text-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <svg className="w-8 h-8 text-cls-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              3. CLS 교육만의 강점 (Point)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="bg-cls-orange w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">단과 및 종합반 운영</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  아이의 취약 과목만 집중 선택하거나, 전 과목을 체계적으로 관리받는 종합반 중 선택 가능합니다.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="bg-cls-orange w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">밀착 생활 지도</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  학습뿐만 아니라 '학습 습관'을 잡는 것에 중점을 두어 장기적인 성적 향상을 도모합니다.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="bg-cls-orange w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">체계적인 교재 라인업</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  검증된 베스트셀러 교재와 CLS만의 노하우가 담긴 미션을 결합하여 시너지 효과를 냅니다.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
