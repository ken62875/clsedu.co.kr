"use client";

import { useEffect, useRef, useState } from "react";

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string | null;
  isDirector: boolean;
  quote: string | null;
  background: string[];
  profileImage: string | null;
  order: number;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop";

const ALL = "전체";

export default function TeacherGrid({ staff }: { staff: Teacher[] }) {
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [activeSubject, setActiveSubject] = useState<string>(ALL);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 강사진의 과목(role) 목록을 등장 순서대로 중복 없이 추출
  const subjects = staff.reduce<string[]>((acc, t) => {
    const s = t.role?.trim();
    if (s && !acc.includes(s)) acc.push(s);
    return acc;
  }, []);

  const filteredStaff =
    activeSubject === ALL
      ? staff
      : staff.filter((t) => t.role?.trim() === activeSubject);

  const openSheet = (teacher: Teacher) => {
    setSelected(teacher);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setSheetVisible(true))
    );
  };

  const closeSheet = () => {
    setSheetVisible(false);
    closeTimerRef.current = setTimeout(() => setSelected(null), 300);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* ── 과목별 필터 버튼 ── */}
      {subjects.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {[ALL, ...subjects].map((subject) => {
            const isActive = activeSubject === subject;
            return (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  isActive
                    ? "bg-cls-black text-white border-cls-black"
                    : "bg-white text-gray-500 border-gray-200 hover:border-cls-black hover:text-cls-black"
                }`}
              >
                {subject}
              </button>
            );
          })}
        </div>
      )}

      {/* ── 모바일: 2열 컴팩트 그리드 ── */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {filteredStaff.map((teacher) => (
          <button
            key={teacher.id}
            onClick={() => openSheet(teacher)}
            className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm text-left active:scale-95 transition-transform hover:[&_img]:grayscale-0 [&_img]:transition-[filter] [&_img]:duration-500"
          >
            <div className="relative aspect-square bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teacher.profileImage ?? FALLBACK_IMG}
                alt={`${teacher.name} 선생님`}
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: "50% 50%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cls-black/85 via-cls-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                {teacher.subject && (
                  <span className="bg-cls-orange text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1 inline-block leading-tight">
                    {teacher.subject}
                  </span>
                )}
                <p className="text-white font-bold text-sm leading-tight">
                  {teacher.name}{" "}
                  <span className="text-xs font-light text-gray-300">T</span>
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── 데스크톱: 3열 풀 카드 ── */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {filteredStaff.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="h-72 overflow-hidden relative bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teacher.profileImage ?? FALLBACK_IMG}
                alt={`${teacher.name} 선생님`}
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cls-black/90 via-cls-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                {teacher.subject && (
                  <span className="bg-cls-orange px-3 py-1 rounded-md text-xs font-bold mb-2 inline-block">
                    {teacher.subject}
                  </span>
                )}
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  {teacher.name}{" "}
                  <span className="text-sm font-light text-gray-300">T</span>
                </h4>
              </div>
            </div>
            <div className="p-8">
              {teacher.quote && (
                <p className="text-gray-600 font-light text-sm italic mb-6 leading-relaxed bg-slate-50 p-4 rounded-lg border-l-2 border-cls-black">
                  &ldquo;{teacher.quote}&rdquo;
                </p>
              )}
              <ul className="text-sm text-gray-600 space-y-3 font-light">
                {teacher.background.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ── 모바일 슬라이드업 상세 시트 ── */}
      {selected && (
        <div className="md:hidden fixed inset-0 z-[100] flex flex-col justify-end">
          {/* 딤 배경 — 클릭 시 닫기 */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              sheetVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSheet}
          />
          {/* 시트 본체 */}
          <div
            className={`relative bg-white rounded-t-3xl transition-transform duration-300 ease-out flex flex-col overflow-hidden ${
              sheetVisible ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ maxHeight: "75vh" }}
          >
            {/* 핸들바 */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* 스크롤 영역 */}
            <div
              className="px-6 pt-2 pb-4 overflow-y-auto flex-1 min-h-0"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* 헤더 */}
              <div className="flex items-center gap-4 py-5 border-b border-gray-100 mb-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.profileImage ?? FALLBACK_IMG}
                    alt={`${selected.name} 선생님`}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  {selected.subject && (
                    <span className="bg-cls-orange text-white text-xs font-bold px-2 py-0.5 rounded mb-1 inline-block">
                      {selected.subject}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-cls-black">
                    {selected.name}{" "}
                    <span className="text-sm font-light text-gray-400">T</span>
                  </h3>
                </div>
              </div>

              {/* 한마디 */}
              {selected.quote && (
                <p className="text-sm text-gray-600 italic leading-relaxed bg-slate-50 p-4 rounded-xl border-l-2 border-cls-black mb-5">
                  &ldquo;{selected.quote}&rdquo;
                </p>
              )}

              {/* 경력 */}
              <ul className="space-y-3">
                {selected.background.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-cls-orange font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 닫기 버튼 — 시트 하단 고정 */}
            <div className="px-6 py-4 shrink-0 border-t border-gray-100">
              <button
                onClick={closeSheet}
                className="w-full py-3 rounded-xl bg-slate-100 text-gray-500 font-medium text-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
