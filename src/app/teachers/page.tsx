import React from "react";
import TeacherGrid, { Teacher } from "@/components/ui/TeacherGrid";

// ─── 기본값 (API 실패 시 fallback) ────────────────────────────────────────────

const DEFAULT_STAFF: Teacher[] = [
  {
    id: "default-1",
    name: "기명훈",
    role: "수학",
    subject: "수학 (Math)",
    isDirector: false,
    quote: "문제 풀이 스킬보다 중요한 것은 논리적 사고의 흐름을 짚어내는 것입니다.",
    background: [
      "연세대학교 수학과 졸업",
      "전) 중계동 탑학원 고등부 팀장",
      "신현고/원묵고 내신 수학 전문가",
    ],
    profileImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop",
    order: 1,
  },
  {
    id: "default-2",
    name: "윤지민",
    role: "영어",
    subject: "영어 (English)",
    isDirector: false,
    quote: "단순 암기가 아닌, 문장의 구조와 언어적 감각을 체득하는 고품격 영어.",
    background: [
      "한국외국어대학교 영어과 졸업",
      "TESOL 수료 및 미국 교환학생 이수",
      "수능 영어 독해/빈칸추론 밀착 코칭",
    ],
    profileImage:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=800&auto=format&fit=crop",
    order: 2,
  },
  {
    id: "default-3",
    name: "이준석",
    role: "국어",
    subject: "국어 (Korean)",
    isDirector: false,
    quote: "문해력이 모든 성적의 기본입니다. 지문을 관통하는 핵심을 짚어줍니다.",
    background: [
      "고려대학교 국어국문학과 졸업",
      "현역 국어/논술 지문 분석서 다수 검수",
      "중랑구 내신 국어 및 수능 비문학 특화",
    ],
    profileImage:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=800&auto=format&fit=crop",
    order: 3,
  },
];

// ─── 서버사이드 데이터 fetch ───────────────────────────────────────────────────

async function fetchStaff(): Promise<Teacher[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return DEFAULT_STAFF;

  try {
    const res = await fetch(`${apiUrl}/api/site-teachers`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return DEFAULT_STAFF;

    const { teachers } = await res.json();
    if (!teachers?.length) return DEFAULT_STAFF;

    const staff = teachers.filter((t: Teacher) => !t.isDirector);
    return staff.length > 0 ? staff : DEFAULT_STAFF;
  } catch {
    return DEFAULT_STAFF;
  }
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default async function Teachers() {
  const staff = await fetchStaff();

  return (
    <div className="min-h-screen bg-white">
      {/* Visual Header */}
      <div className="bg-cls-black py-24 text-center mt-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-cls-orange text-white text-sm font-bold tracking-widest mb-6 border border-cls-orange/50 shadow-lg shadow-cls-orange/20">
            OUR INSTRUCTORS
          </span>
          <h1 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-4 break-keep">
            최고의 강사진이 <span className="text-cls-orange">결과</span>를 증명합니다
          </h1>
          <p className="text-sm md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed break-keep">
            &ldquo;선생님의 자부심이 곧 아이들의 실력이 됩니다.&rdquo;<br/>
            대치·목동 출신 검증된 강사진이<br/>
            신내동 교육의 패러다임을 바꿉니다.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {/* Subject Instructors Grid */}
        {staff.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <h2 className="text-xl md:text-3xl font-bold text-cls-black">과목별 전임 강사진</h2>
            </div>
            <TeacherGrid staff={staff} />
          </div>
        )}
      </div>
    </div>
  );
}
