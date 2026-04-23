import React from "react";

interface Teacher {
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

// ─── 기본값 (API 실패 시 fallback) ────────────────────────────────────────────

const DEFAULT_DIRECTOR: Teacher = {
  id: "default-director",
  name: "최금란",
  role: "원장 / 입시 총괄",
  subject: null,
  isDirector: true,
  quote:
    "올바른 방향 설정 없이 속도만 내는 공부는 의미가 없습니다. 학생 한 명 한 명의 잠재력을 정확히 파악하여, 깊이 있는 공부 근육을 길러주는 것이 CLS에듀케이션의 존재 이유입니다.",
  background: [
    "학력: 서울 소재 주요 대학 사범대 수학교육과 졸업",
    "경력: 대치동/목동 대형 학원 입시반 전임 (전)",
    "실적: 스카이(SKY) 및 메디컬 계열 다수 배출 (20여년 경력)",
    "철학: 진짜 실력은 속도가 아니라 깊이에서 나옵니다.",
  ],
  profileImage:
    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  order: 0,
};

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

async function fetchTeachers(): Promise<{ directors: Teacher[]; staff: Teacher[] }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return { directors: [DEFAULT_DIRECTOR], staff: DEFAULT_STAFF };

  try {
    const res = await fetch(`${apiUrl}/api/site-teachers`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { directors: [DEFAULT_DIRECTOR], staff: DEFAULT_STAFF };

    const { teachers } = await res.json();
    if (!teachers?.length) return { directors: [DEFAULT_DIRECTOR], staff: DEFAULT_STAFF };

    const directors = teachers.filter((t: Teacher) => t.isDirector);
    const staff = teachers.filter((t: Teacher) => !t.isDirector);

    return {
      directors: directors.length > 0 ? directors : [DEFAULT_DIRECTOR],
      staff,
    };
  } catch {
    return { directors: [DEFAULT_DIRECTOR], staff: DEFAULT_STAFF };
  }
}

// ─── 학력/경력 항목 파싱 ─────────────────────────────────────────────────────

function parseBackground(item: string): { label: string; content: string } {
  const colonIdx = item.indexOf(":");
  if (colonIdx > 0 && colonIdx < 5) {
    return {
      label: item.slice(0, colonIdx).trim(),
      content: item.slice(colonIdx + 1).trim(),
    };
  }
  return { label: "", content: item };
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default async function Teachers() {
  const { directors, staff } = await fetchTeachers();

  return (
    <div className="min-h-screen bg-white">
      {/* Visual Header */}
      <div className="bg-cls-black py-24 text-center mt-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-cls-orange text-white text-sm font-bold tracking-widest mb-6 border border-cls-orange/50 shadow-lg shadow-cls-orange/20">
            OUR INSTRUCTORS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            최고의 강사진이 <span className="text-cls-orange">결과</span>를 증명합니다
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            &ldquo;선생님의 자부심이 곧 아이들의 실력이 됩니다.&rdquo;<br/>
            대치·목동 출신 검증된 강사진이 신내동 교육의 패러다임을 바꿉니다.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Director / Head Teacher */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 border-l-4 border-cls-orange pl-4">
            <h2 className="text-3xl font-bold text-cls-black">원장</h2>
            <span className="text-gray-400 font-light hidden sm:inline-block">Head Instructor</span>
          </div>

          <div className="space-y-10">
            {directors.map((director) => (
              <div key={director.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 group">
                <div className="md:w-2/5 md:bg-gray-50 flex items-center justify-center p-0 relative overflow-hidden">
                  <div className="w-full h-[400px] md:h-full bg-slate-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-cls-black/80 to-transparent z-10 md:hidden"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={director.profileImage ?? "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"}
                      alt={`${director.name} 프로필`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="md:w-3/5 p-10 md:p-14 relative bg-white">
                  <div className="absolute top-14 right-14 text-6xl text-gray-100 font-serif leading-none opacity-50 hidden md:block">&ldquo;</div>
                  <h3 className="text-cls-orange font-bold text-lg mb-2">{director.role}</h3>
                  <h4 className="text-4xl font-extrabold text-cls-black mb-6">
                    {director.name}
                  </h4>
                  {director.quote && (
                    <p className="text-xl text-gray-700 italic font-light mb-8 break-keep leading-relaxed relative z-10">
                      &ldquo;{director.quote}&rdquo;
                    </p>
                  )}
                  <div className="space-y-4 text-gray-600 font-light">
                    {director.background.map((item, i) => {
                      const { label, content } = parseBackground(item);
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-cls-orange mt-1">✓</span>
                          <p>
                            {label && (
                              <span className="font-semibold text-cls-black mr-2">{label}:</span>
                            )}
                            {content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Instructors Grid */}
        {staff.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10 border-b pb-4">
              <h2 className="text-3xl font-bold text-cls-black">과목별 전임 강사진</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="h-72 overflow-hidden relative bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        teacher.profileImage ??
                        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={`${teacher.name} 선생님`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cls-black/90 via-cls-black/20 to-transparent"></div>
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
          </div>
        )}
      </div>
    </div>
  );
}
