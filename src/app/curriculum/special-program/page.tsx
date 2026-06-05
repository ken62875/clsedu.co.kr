"use client";

import React from "react";
import FadeIn from "@/components/ui/FadeIn";
import { BOOKING_URL } from "@/lib/booking";

export default function SpecialProgram() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-8 md:pt-24 pb-16 md:pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <FadeIn direction="up" duration={800}>
          <div className="text-center mb-8 md:mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-cls-orange/10 text-cls-orange border border-cls-orange/20 text-xs md:text-sm font-bold mb-3 md:mb-4">
              Special Program
            </span>
            <h1 className="text-2xl md:text-5xl font-bold text-cls-black mb-3 md:mb-6 tracking-tight">
              특별 프로그램
            </h1>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed break-keep">
              정규 교과과정 외에 성적 향상의 기폭제가 될 CLS 단기 및 특화 프로그램을 소개합니다.
            </p>
          </div>
        </FadeIn>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-10">

          {/* Card 1: 국빛 ‘국어 개념 완성’ */}
          <FadeIn direction="up" delay={100} duration={800}>
            <div className="group relative bg-white rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

              <div className="p-5 md:p-10 flex-grow">
                <div className="inline-flex items-center justify-center p-2.5 md:p-3 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl mb-4 md:mb-6">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <span className="text-xs md:text-sm font-bold text-indigo-600 tracking-wider uppercase mb-2 block">
                  고등부 국어
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-indigo-600 transition-colors">
                  국빛 ‘국어 개념 완성’
                </h2>

                <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 break-keep">
                  수능과 내신 국어의 핵심을 찌르는 개념 총정리 특강입니다. 문학/독서의 기본 바탕을 탄탄히 다지고, 흔들리지 않는 국어 등급의 뼈대를 세우는 과정입니다.
                </p>

                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                    <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>수능 기출 지문 완벽 분석 훈련</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                    <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>갈래별 핵심 문학 개념어 정리</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                    <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>고난도 비문학 독해 논리 훈련</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 md:px-10 border-t border-gray-100 flex justify-between items-center gap-3">
                <span className="text-gray-500 text-sm md:text-base font-medium">상시 모집 / 선착순 마감</span>
                <button
                  onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
                  className="shrink-0 px-5 md:px-6 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm md:text-base font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors shadow-sm"
                >
                  상담 신청
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: 2025 윈터스쿨 학습 계획 */}
          <FadeIn direction="up" delay={200} duration={800}>
            <div className="group relative bg-white rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cls-orange to-red-500" />

              <div className="p-5 md:p-10 flex-grow">
                <div className="inline-flex items-center justify-center p-2.5 md:p-3 bg-red-50 text-red-500 rounded-xl md:rounded-2xl mb-4 md:mb-6">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <span className="text-xs md:text-sm font-bold text-red-500 tracking-wider uppercase mb-2 block">
                  고등부 국어
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-red-500 transition-colors">
                  2026 윈터스쿨 학습 계획
                </h2>

                <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 break-keep">
                  겨울방학 골든타임을 완벽하게 장악할 윈터스쿨 몰입 과정. 새 학년 진급 전 국어 과목의 구조별 선행과 확실한 성적 반등을 목표로 타이트하게 관리됩니다.
                </p>

                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>종일 이어지는 텐투텐(10 to 10) 관리</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>수능 국어 및 새 학기 내신 선행 집중 커리큘럼</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>일일 테스트 및 부족한 부분 1:1 클리닉 진행</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 md:px-10 border-t border-gray-100 flex justify-between items-center gap-3">
                <span className="text-gray-500 text-sm md:text-base font-medium">12월 개강 / 사전 예약 중</span>
                <button
                  onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
                  className="shrink-0 px-5 md:px-6 py-2 bg-cls-black rounded-lg text-white text-sm md:text-base font-semibold hover:bg-cls-orange transition-colors shadow-md"
                >
                  사전 예약
                </button>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
