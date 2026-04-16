"use client";

import React, { useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

interface CourseItem {
  level: string;
  subject: string;
  content: string;
  room: string;
  time: string;
  teacher: string;
}

interface LevelMeta {
  title: string;
  description: string;
}

interface LevelData {
  title: string;
  description: string;
  href: string;
  courses: (CourseItem & { id: number })[];
}

// ─── 기본값 (API 실패 시 fallback) ────────────────────────────────────────────

const DEFAULT_DATA: Record<"primary" | "middle" | "high", LevelData> = {
  primary: {
    title: "초등부 교과과정",
    description: "공부의 기본기를 탄탄하게 다지고 올바른 학습 습관을 형성하는 CLS 초등부",
    href: "/curriculum/elementary-school",
    courses: [
      { id: 1, subject: "국어", content: "독해력 향상 및 문해력 기초, 논술", room: "A강의실", time: "월,수 15:00-16:30", teacher: "김지민 강사", level: "primary" },
      { id: 2, subject: "영어", content: "파닉스, 스토리텔링 및 기초 회화", room: "B강의실", time: "화,목 15:00-16:30", teacher: "Sarah Teacher", level: "primary" },
      { id: 3, subject: "수학", content: "교과 수학 개념 및 창의 사고력", room: "C강의실", time: "월,수 16:30-18:00", teacher: "이현우 강사", level: "primary" },
      { id: 4, subject: "비교과", content: "창의 융합 코딩 및 발표 토론", room: "D강의실", time: "금 15:00-17:00", teacher: "정민아 강사", level: "primary" },
    ],
  },
  middle: {
    title: "중등부 교과과정",
    description: "내신 완벽 대비와 특목고 진학을 위해 심도있는 학업 역량을 기르는 중등부",
    href: "/curriculum/middle-school",
    courses: [
      { id: 1, subject: "국어", content: "내신 국어 집중 대비 및 수능 국어 기초", room: "A강의실", time: "월,수 17:00-19:00", teacher: "정수진 강사", level: "middle" },
      { id: 2, subject: "영어", content: "내신 만점 및 수능 독해/문법 심화", room: "B강의실", time: "화,목 17:00-19:00", teacher: "박준영 강사", level: "middle" },
      { id: 3, subject: "수학", content: "학교별 맞춤 수학 선행 및 심화 (KMO 기초)", room: "C강의실", time: "화,목 19:00-21:00", teacher: "최동훈 강사", level: "middle" },
      { id: 4, subject: "과학/사회", content: "중등 과학 내신 및 물리/화학/한국사 기초", room: "D강의실", time: "금 17:00-20:00", teacher: "윤지원 강사", level: "middle" },
    ],
  },
  high: {
    title: "고등부 교과과정",
    description: "수능 1등급 및 명문대 진학을 위해 최정예 강사진이 제공하는 완벽한 솔루션",
    href: "/curriculum/high-school",
    courses: [
      { id: 1, subject: "수능 국어", content: "수능/모평 완벽 분석 및 고난도 심화 독해", room: "1강의실", time: "토 09:00-13:00", teacher: "김성호 강사", level: "high" },
      { id: 2, subject: "수능 영어", content: "EBS 간접 연계 및 고난도 빈칸/순서 완벽 대비", room: "2강의실", time: "일 09:00-13:00", teacher: "이유진 강사", level: "high" },
      { id: 3, subject: "수능 수학", content: "미적분, 기하, 확통 심화 및 킬러문항 정복", room: "3강의실", time: "토 14:00-18:00", teacher: "강민철 강사", level: "high" },
      { id: 4, subject: "과학/사회 탐구", content: "물리학I, 화학I 등 선택과목 수능 1등급 대비반", room: "4강의실", time: "일 14:00-18:00", teacher: "박동진 강사", level: "high" },
    ],
  },
};

const HREF_MAP: Record<string, string> = {
  primary: "/curriculum/elementary-school",
  middle: "/curriculum/middle-school",
  high: "/curriculum/high-school",
};

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState<"primary" | "middle" | "high">("primary");
  const [curriculumData, setCurriculumData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/api/site-content?section=curriculum`)
      .then((r) => r.json())
      .then(({ items }) => {
        if (!items?.length) return;

        const metas: Record<string, LevelMeta> = {};
        const courseMap: Record<string, (CourseItem & { id: number })[]> = {
          primary: [],
          middle: [],
          high: [],
        };

        items.forEach(
          (item: { key: string; data: Record<string, unknown>; order: number }) => {
            if (item.key.endsWith("_meta")) {
              const level = item.key.replace("_meta", "");
              metas[level] = item.data as unknown as LevelMeta;
            } else if (item.key.includes("_course_")) {
              const d = item.data as unknown as CourseItem;
              const level = d.level as "primary" | "middle" | "high";
              if (level && courseMap[level]) {
                courseMap[level].push({ ...d, id: courseMap[level].length + 1 });
              }
            }
          }
        );

        setCurriculumData((prev) => {
          const next = { ...prev };
          (["primary", "middle", "high"] as const).forEach((level) => {
            next[level] = {
              title: metas[level]?.title ?? prev[level].title,
              description: metas[level]?.description ?? prev[level].description,
              href: HREF_MAP[level],
              courses: courseMap[level].length > 0 ? courseMap[level] : prev[level].courses,
            };
          });
          return next;
        });
      })
      .catch(() => {/* API 실패 시 기본값 유지 */});
  }, []);

  const activeData = curriculumData[activeTab];

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <FadeIn direction="up" duration={800}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-cls-black mb-6 tracking-tight">CLS 교과 과정</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              학생의 수준과 목표에 맞춘 체계적이고 전문적인 학습 커리큘럼을 제공합니다.
              <br className="hidden sm:block" /> 기초부터 최상위권 도약까지 CLS 에듀케이션이 함께합니다.
            </p>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn direction="up" delay={200} duration={800}>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-12">
            {[
              { id: "primary", label: "초등부" },
              { id: "middle", label: "중등부" },
              { id: "high", label: "고등부" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "primary" | "middle" | "high")}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ease-out shadow-sm
                  ${activeTab === tab.id
                    ? "bg-cls-orange text-white shadow-xl shadow-cls-orange/20 translate-y-[-2px]"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Content Section */}
        <FadeIn key={activeTab} direction="up" delay={100} duration={600}>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Inner Header */}
            <div className="bg-gradient-to-r from-gray-900 to-cls-black-light text-white p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-3">{activeData.title}</h2>
                <p className="text-gray-300 leading-relaxed font-light">{activeData.description}</p>
              </div>
              <div className="flex items-center">
                <Link
                  href={activeData.href}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-colors backdrop-blur-md flex items-center gap-2"
                >
                  자세히 보기
                  <svg className="w-4 h-4 mt-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Table wrapper */}
            <div className="p-6 md:p-10 hide-scrollbar overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-cls-black text-cls-black">
                      <th className="py-4 px-4 font-bold w-[12%]">과목</th>
                      <th className="py-4 px-4 font-bold w-[38%]">학습 내용</th>
                      <th className="py-4 px-4 font-bold w-[15%]">클래스룸</th>
                      <th className="py-4 px-4 font-bold w-[20%]">시간</th>
                      <th className="py-4 px-4 font-bold w-[15%]">담당 강사</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeData.courses.map((course) => (
                      <tr
                        key={course.id}
                        className="hover:bg-slate-50 transition-colors duration-200 group"
                      >
                        <td className="py-5 px-4 font-semibold text-cls-black">
                          <span className="inline-block bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700">
                            {course.subject}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-gray-600 font-medium">{course.content}</td>
                        <td className="py-5 px-4 text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-cls-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {course.room}
                          </div>
                        </td>
                        <td className="py-5 px-4 text-gray-700 font-medium">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-cls-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.time}
                          </div>
                        </td>
                        <td className="py-5 px-4 text-gray-700 font-semibold">{course.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer / Payment CTA */}
            <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-gray-500 text-sm">
                <p>※ 교재비 및 온라인 학습 시스템 이용료는 별도입니다.</p>
                <p>※ 자세한 시간표 및 반 배정은 레벨 테스트 후 상담을 통해 결정됩니다.</p>
              </div>
              <Link
                href={activeData.href}
                className="group w-full md:w-auto px-8 py-4 bg-cls-black hover:bg-cls-orange text-white font-bold rounded-xl transition-all duration-300 ease-out flex items-center justify-center gap-2 shadow-lg hover:shadow-cls-orange/30 hover:-translate-y-1"
              >
                <span>자세히보기</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
