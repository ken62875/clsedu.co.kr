"use client";

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function MiddleSchoolCurriculum() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-24 pb-20 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="/images/programs/middle_school_study.jpg"
          alt="중등부 교과과정"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <FadeIn direction="up" duration={800}>
            <span className="inline-block py-1 px-3 rounded-full bg-cls-orange/20 text-cls-orange border border-cls-orange/30 text-sm font-bold mb-4 backdrop-blur-md">
              Middle School
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              중등부 교과과정
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              &quot;내신은 완벽하게, 수능은 앞서가게!<br />
              마음을 움직여 스스로 공부하는 힘을 기릅니다.&quot;
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        
        {/* 1. 학년별 및 수준별 운영 체계 */}
        <FadeIn direction="up" delay={100} duration={800}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cls-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-cls-orange rounded-full"></span>
              1. 학년별 및 수준별 운영 체계
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              중등부는 인지적 성장과 입시 환경의 변화에 맞춰 학년별 공통 과정과 수준별 특화 과정을 이원화하여 운영합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-cls-orange">학년별 공통 과정</h3>
                <p className="text-gray-600 leading-relaxed">학교별 출판사에 맞춘 철저한 내신 대비 및 수행평가 밀착 관리.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:border-cls-orange/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-cls-orange">수준별 특화 과정</h3>
                <p className="text-gray-600 leading-relaxed">학생의 성취도에 따라 <strong>[수능 대비반]</strong> 및 <strong>[모의고사 준비반]</strong>으로 편성하여 고등 입시 체제에 최적화된 실전 감각을 배양합니다.</p>
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
              <p className="text-gray-600 text-lg">주요 과목의 깊이 있는 학습과 탐구 과목의 효율적인 시간 배분으로 학습 밸런스를 완성합니다.</p>
            </div>

            <div className="space-y-8">
              {/* English */}
              <div className="border-l-4 border-indigo-500 pl-6 py-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">① 영어 (English)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>Reading:</strong> 주니어 리딩튜터 시리즈를 통해 지문 분석력과 논리적 추론 능력 강화.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>Grammar:</strong> 그래머 와이즈(Grammar Wise) 시리즈로 중등 핵심 문법의 개념 정립 및 서술형 문항 완벽 대비.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>Vocabulary (Daily Mission):</strong> 워드마스터 / 능률보카를 활용한 매일 테스트. 꾸준한 단어 학습 습관 형성에 주력합니다.</p>
                  </li>
                </ul>
              </div>

              {/* Math */}
              <div className="border-l-4 border-teal-500 pl-6 py-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">② 수학 (Mathematics)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>1:1 맞춤 지도:</strong> 기초부터 심화까지 학생의 이해도에 맞춘 눈높이 지도로 학습 구멍을 제거합니다.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>실전 감각:</strong> 개념 이해가 완벽해질 때까지 반복 학습하고, 시험 컨셉의 평가를 통해 실전 응용력을 극대화합니다.</p>
                  </li>
                </ul>
              </div>

              {/* Korean & Science */}
              <div className="border-l-4 border-rose-500 pl-6 py-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">③ 국어 & 과학 (Korean & Science)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-gray-700"><strong>주1회 전략 수업:</strong> 영·수 중심의 학습 속에서도 국어와 과학의 균형을 놓치지 않도록 주 1회 집중 커리큘럼을 운영하여 문해력과 탐구 능력을 동시에 잡습니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3 & 4 Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 강점 */}
          <FadeIn direction="up" delay={300} duration={800}>
            <div className="bg-gradient-to-br from-gray-900 to-cls-black-light text-white rounded-3xl shadow-xl p-8 md:p-10 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-cls-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                3. CLS만의 독보적 강점
              </h2>
              <p className="text-cls-orange mb-6 font-semibold bg-white/10 p-4 rounded-xl border border-white/20">
                "공부하고자 하는 마음이 먼저입니다. 의지를 일깨우는 따뜻한 격려"
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                모든 교육 과정의 근간에는 CLS만의 <strong>[감성 터치 & 심리 상담]</strong> 시스템이 흐르고 있습니다. 단순히 지식을 전달하는 것을 넘어, 학생의 마음을 먼저 돌봅니다.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cls-orange mt-2 flex-shrink-0" />
                  <p className="text-gray-200"><strong>정기 학습심리상담:</strong> 전문적인 상담을 통해 학생의 학습 고민을 경청하고 정기적인 대화의 시간을 갖습니다.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cls-orange mt-2 flex-shrink-0" />
                  <p className="text-gray-200"><strong>동기부여의 힘:</strong> 따뜻한 칭찬과 진심 어린 격려를 통해, 억지로 하는 공부가 아닌 '나도 해보고 싶다'는 의지를 스스로 일깨울 수 있도록 지도합니다.</p>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* 클리닉 */}
          <FadeIn direction="up" delay={400} duration={800}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 h-full">
              <h2 className="text-2xl font-bold text-cls-black mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-cls-orange rounded-full"></span>
                4. 특별 클리닉 프로그램
              </h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">① 영어 클리닉 (English Clinic)</h3>
                <p className="text-cls-orange text-sm mb-3 font-medium">"중랑구 학생들의 높은 만족도, 기초부터 다시 시작하는 자신감"</p>
                <p className="text-gray-600 text-sm leading-relaxed">배움의 시기를 놓쳐 베이스가 없는 학생들을 위한 특화 수업입니다. 학년과 상관없이 기초부터 차근차근 공부하며 교과서 중심의 학교 수업에 집중합니다. 이를 통해 학교 수업에 활기차게 참여하게 되고, 성적 향상을 직접 경험하며 공부에 대한 욕심을 갖게 되는 성공 사례가 많습니다.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">② 클리닉 플러스 (Clinic Plus)</h3>
                <p className="text-cls-orange text-sm mb-3 font-medium">"만족도 최상, 1:1 밀착 관리를 통한 확실한 레벨업"</p>
                <p className="text-gray-600 text-sm leading-relaxed">정규 수업 외에 진행되는 특별 수업으로, 개별적인 밀착 지도를 통해 부족한 기초를 채우거나 상위 레벨로 도약하기 위한 맞춤형 집중 수업입니다.</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 5. 수업 구조 및 운영 방식 */}
        <FadeIn direction="up" delay={500} duration={800}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-cls-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-cls-orange rounded-full"></span>
              5. 수업 구조 및 운영 방식
            </h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200">
                    <th className="py-4 px-6 font-bold text-gray-800 w-1/3">구분</th>
                    <th className="py-4 px-6 font-bold text-gray-800 w-1/3">수업 구성</th>
                    <th className="py-4 px-6 font-bold text-gray-800 w-1/3">운영 특징</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-800">정규반 A</td>
                    <td className="py-4 px-6 text-gray-600">월 / 수 (+클리닉)</td>
                    <td className="py-4 px-6 text-gray-600" rowSpan={2} style={{ verticalAlign: 'middle', borderLeft: '1px solid #f3f4f6' }}>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2"><svg className="w-4 h-4 text-cls-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 단과 및 종합반 선택 가능</li>
                        <li className="flex items-center gap-2"><svg className="w-4 h-4 text-cls-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 학생별 맞춤형 밀착 생활 지도</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-800">정규반 B</td>
                    <td className="py-4 px-6 text-gray-600">화 / 목 (+클리닉)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 text-center">
              <p className="text-gray-700 font-medium">
                CLS에듀케이션은 중랑구 지역 학생들의 특성을 가장 잘 이해하며, 탄탄한 교재 라인업과 정서적 교감을 결합하여 단순한 성적 향상을 넘어 학생의 인생에 긍정적인 변화를 만드는 교육 지향합니다.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
