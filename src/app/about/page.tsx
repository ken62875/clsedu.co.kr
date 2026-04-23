import React from "react";
import KakaoMap from "@/components/ui/KakaoMap";
import { sanitizeHtml } from "@/lib/sanitize";

interface HeroContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
}

interface IntroContent {
  heading: string;
  description: string;
}

interface BasicInfo {
  location: string;
  address: string;
  target: string;
  subjects: string;
  features: string;
  phone: string;
  hours: string;
  kakao: string;
  subway: string;
  bus: string;
  parking: string;
  mapUrl?: string;
}

interface PhilosophyItem {
  number: number;
  title: string;
  content: string;
}

// ─── 기본값 (API 실패 시 fallback) ────────────────────────────────────────────

const DEFAULT_HERO: HeroContent = {
  title: "About",
  titleHighlight: "CLS",
  subtitle:
    "“공부가 외롭지 않도록, 결과가 두렵지 않도록\n곁에서 함께 걷는 교육”",
};

const DEFAULT_INTRO: IntroContent = {
  heading: "신내동 최고의 교육 파트너",
  description:
    "단순히 지식을 전달하는 곳을 넘어, 아이들의 학습 습관과 마음까지 세심하게 살피는 곳.\n신내동에서 꾸준히 신뢰를 쌓아온 CLS에듀케이션이 우리 아이들의 ‘든든한 교육 파트너’가 되어드립니다.",
};

const DEFAULT_BASIC_INFO: BasicInfo = {
  location: "신내동 영창빌딩 7층",
  address: "서울특별시 중랑구 봉화산로 218 영창빌딩 7층",
  target: "초등, 중등, 고등",
  subjects: "국 · 영 · 수 · 과",
  features: "내신분석, 윈터스쿨",
  phone: "02-493-8899",
  hours: "평일/주말 14:00 - 22:00",
  kakao: "카카오톡 채널 'CLS 에듀케이션학원' 검색",
  subway: "6호선 봉화산역 3/4번 출구 이동",
  bus: "영창빌딩 앞 정류장 하차",
  parking: "건물 내 주차장 이용 문의 필요",
  mapUrl: "https://place.map.kakao.com/290325055",
};

const DEFAULT_PHILOSOPHIES: PhilosophyItem[] = [
  {
    number: 1,
    title: "첫 만남부터 밀착 케어까지: \"1:1 맞춤형 로드맵\"",
    content:
      "아이마다 속도가 다르고 취약한 부분이 다릅니다. CLS는 학생이 처음 방문하는 순간부터 현재의 학습 상태와 목표를 정밀하게 진단합니다. 원장님과 실장님이 직접 심층 상담을 진행하며, 과목별 선생님들과 유기적으로 소통하여 빈틈없이 관리합니다.",
  },
  {
    number: 2,
    title: "CLS만의 특별함: \"공부 근육을 기르는 관리 시스템\"",
    content:
      "수업만 듣고 끝나는 공부는 진짜 실력이 되지 않습니다. 학생이 '스스로 공부하는 힘'을 기를 수 있도록 꼼꼼한 피드백을 제공하며, 권위적인 강의 대신 편하게 질문할 수 있는 따뜻한 분위기를 지향합니다.",
  },
  {
    number: 3,
    title: "지역 학교 최적화: \"성장하는 안정적 학습 공동체\"",
    content:
      "신현고, 혜원여고, 원묵고 등 인근 학교 학생들이 모여 서로 긍정적인 자극을 주고받습니다. 각 학교별 출제 경향을 꿰뚫는 내신 완벽 대비와 방학 윈터스쿨로 다음 학기를 탄탄히 준비합니다.",
  },
  {
    number: 4,
    title: "결과로 증명하는 실력: \"내신·수능·입시 통합 관리\"",
    content:
      "단기 점수 상승이 아닌 장기적인 성장을 목표로 합니다. 학기 중에는 학교별 내신 완벽 대비, 방학 중에는 취약 단원 심화와 선행 학습을 병행하여 상위권 진입과 목표 대학 진학까지 체계적으로 이끌어 드립니다.",
  },
];

const DEFAULT_PROMISE =
  '학습 습관이 흔들릴 때는 조용히 손을 내밀어 중심을 잡아주고, 어려운 과목은 끝까지 함께 풀어내며 아이 스스로 "해냈다"는 변화를 느낄 수 있도록 돕겠습니다.\n\n학창 시절 배우는 것은 입시 지식 그 이상입니다. 포기하지 않는 인내와 스스로를 밀어붙이는 열정으로 \'자기 자신\'을 만들어갑니다.\n\n"부모님께서 안심하고 맡기실 수 있는 곳, 아이들에게 좋은 시간으로 남는 곳 — CLS가 그 자리를 지키겠습니다."';

// ─── 서버사이드 데이터 fetch ───────────────────────────────────────────────────

async function fetchAboutData(): Promise<{
  hero: HeroContent;
  intro: IntroContent;
  basicInfo: BasicInfo;
  philosophies: PhilosophyItem[];
  promise: string;
}> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl)
    return {
      hero: DEFAULT_HERO,
      intro: DEFAULT_INTRO,
      basicInfo: DEFAULT_BASIC_INFO,
      philosophies: DEFAULT_PHILOSOPHIES,
      promise: DEFAULT_PROMISE,
    };

  try {
    const res = await fetch(`${apiUrl}/api/site-content?section=about`, {
      next: { revalidate: 300 },
    });
    if (!res.ok)
      return {
        hero: DEFAULT_HERO,
        intro: DEFAULT_INTRO,
        basicInfo: DEFAULT_BASIC_INFO,
        philosophies: DEFAULT_PHILOSOPHIES,
        promise: DEFAULT_PROMISE,
      };

    const { items } = await res.json();
    if (!items?.length)
      return {
        hero: DEFAULT_HERO,
        intro: DEFAULT_INTRO,
        basicInfo: DEFAULT_BASIC_INFO,
        philosophies: DEFAULT_PHILOSOPHIES,
        promise: DEFAULT_PROMISE,
      };

    let hero = DEFAULT_HERO;
    let intro = DEFAULT_INTRO;
    let basicInfo = DEFAULT_BASIC_INFO;
    const philosophies: PhilosophyItem[] = [];
    let promise = DEFAULT_PROMISE;

    items.forEach((item: { key: string; data: Record<string, unknown> }) => {
      if (item.key === "hero")
        hero = { ...DEFAULT_HERO, ...(item.data as unknown as Partial<HeroContent>) };
      else if (item.key === "intro")
        intro = { ...DEFAULT_INTRO, ...(item.data as unknown as Partial<IntroContent>) };
      else if (item.key === "basic_info") basicInfo = item.data as unknown as BasicInfo;
      else if (item.key.startsWith("philosophy_"))
        philosophies.push(item.data as unknown as PhilosophyItem);
      else if (item.key === "promise")
        promise = (item.data as unknown as { content: string }).content;
    });

    return {
      hero,
      intro,
      basicInfo,
      philosophies: philosophies.sort((a, b) => a.number - b.number).length
        ? philosophies
        : DEFAULT_PHILOSOPHIES,
      promise,
    };
  } catch {
    return {
      hero: DEFAULT_HERO,
      intro: DEFAULT_INTRO,
      basicInfo: DEFAULT_BASIC_INFO,
      philosophies: DEFAULT_PHILOSOPHIES,
      promise: DEFAULT_PROMISE,
    };
  }
}

const PHILOSOPHY_COLORS = [
  "bg-cls-orange",
  "bg-cls-black",
  "bg-cls-orange",
  "bg-cls-black",
];

function isHtmlContent(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str);
}

export default async function About() {
  const { hero, intro, basicInfo, philosophies, promise } = await fetchAboutData();

  // 약속 텍스트를 문단으로 분리
  const promiseParagraphs = promise.split("\n\n").filter((p) => p.trim());

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
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-md">
            {hero.title}
            {hero.titleHighlight && (
              <>
                {hero.title && " "}
                <span className="text-cls-orange">{hero.titleHighlight}</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md whitespace-pre-line">
            {hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Intro Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cls-orange/10 rounded-bl-full"></div>
          <h2 className="text-3xl font-bold text-cls-black mb-6">{intro.heading}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 break-keep whitespace-pre-line">
            {intro.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm text-gray-400 mb-1">위치</p>
              <p className="font-semibold text-cls-black">{basicInfo.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">대상</p>
              <p className="font-semibold text-cls-black">{basicInfo.target}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">과목</p>
              <p className="font-semibold text-cls-black">{basicInfo.subjects}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">특징</p>
              <p className="font-semibold text-cls-black">{basicInfo.features}</p>
            </div>
          </div>
        </div>

        {/* Philosophy Details */}
        <h3 className="text-2xl md:text-3xl font-bold text-cls-black text-center mb-12">
          CLS에듀케이션 <span className="text-cls-orange">교육 철학</span>
        </h3>

        <div className="space-y-6 mb-20">
          {philosophies.map((p, i) => (
            <div
              key={p.number}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border border-slate-100"
            >
              <div
                className={`w-16 h-16 shrink-0 ${PHILOSOPHY_COLORS[i % PHILOSOPHY_COLORS.length]} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md`}
              >
                {p.number}
              </div>
              <div>
                <h4 className="text-xl font-bold text-cls-black mb-3">{p.title}</h4>
                {isHtmlContent(p.content) ? (
                  <div
                    className="text-gray-600 leading-relaxed font-light story-content"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.content) }}
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed font-light break-keep">{p.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Promise Section */}
        <div className="bg-cls-black text-white rounded-3xl p-10 md:p-16 mb-20 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513258496099-481620b4cbdb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8 text-cls-orange">CLS에듀케이션의 약속</h3>
            <div className="space-y-6 text-lg font-light leading-relaxed max-w-4xl mx-auto opacity-90 break-keep">
              {isHtmlContent(promise) ? (
                <div
                  className="about-promise-content"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(promise) }}
                />
              ) : (
                promiseParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === promiseParagraphs.length - 1
                        ? "font-medium text-white italic mt-8 text-xl opacity-100"
                        : ""
                    }
                  >
                    {para}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
          <h3 className="text-2xl font-bold text-cls-black mb-8 border-b pb-4">찾아오시는 길</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden">
              <KakaoMap />
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-cls-black text-lg mb-2">주소 (Address)</h4>
                <p className="text-gray-600 font-light">{basicInfo.address}</p>
              </div>
              <div>
                <h4 className="font-bold text-cls-black text-lg mb-2">교통편 (Transport)</h4>
                <ul className="text-gray-600 space-y-2 list-disc list-inside font-light">
                  <li>
                    <strong>지하철:</strong> {basicInfo.subway}
                  </li>
                  <li>
                    <strong>버스:</strong> {basicInfo.bus}
                  </li>
                  <li>
                    <strong>주차:</strong> {basicInfo.parking}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-cls-black text-lg mb-2">상담 문의 (Contact)</h4>
                <p className="text-gray-600 font-light">
                  📞 {basicInfo.phone} ({basicInfo.hours})
                  <br />
                  <br />
                  {basicInfo.kakao}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
