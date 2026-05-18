import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/ui/HeroSlider";
import FadeIn from "@/components/ui/FadeIn";
import CountupStats, { type StatData } from "@/components/ui/CountupStats";
import ReviewCarousel from "@/components/ui/ReviewCarousel";
import { sanitizeHtml } from "@/lib/sanitize";

// BlockNote 에디터가 생성한 HTML인지, 순수 텍스트인지 판별
function isHtmlContent(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(value);
}

// ─── 기본값 (API 실패 시 fallback) ────────────────────────────────────────────

const DEFAULT_STATS: StatData[] = [
  { end: 15000, label: "누적수강생", suffix: "+" },
  { end: 98.8, label: "학생만족도", suffix: "%" },
  { end: 5, label: "평균 수강기간", suffix: "Year" },
];

const DEFAULT_PHILOSOPHY = [
  {
    title: "1:1 맞춤형 로드맵",
    description:
      "학생 한 명 한 명의 학습 속도와 취약점을 분석하여, 오직 그 학생만을 위한 커리큘럼을 설계합니다.",
  },
  {
    title: "공부 근육 관리 시스템",
    description:
      "단순 지식 전달을 넘어, 자기 주도적으로 공부하는 힘을 기르는 습관 관리 시스템을 운영합니다.",
  },
  {
    title: "함께 성장하는 공동체",
    description:
      "같은 목표를 향해 나아가는 동료들과 함께하며, 서로 긍정적인 자극을 주고받는 환경을 만듭니다.",
  },
];

const DEFAULT_PROGRAMS = [
  {
    category: "High School",
    imageUrl: "https://media.clsedu.co.kr/programs/high_school_study.jpg",
    title: "고등부/입시",
    description:
      "수능과 내신을 아우르는 심층 학습으로 SKY 및 상위권 대학 진학의 꿈을 실현합니다.",
  },
  {
    category: "Middle School",
    imageUrl: "https://media.clsedu.co.kr/programs/middle_school_study.jpg",
    title: "중등부",
    description:
      "신현중 등 인근 학교의 철저한 내신 분석과 특목고 대비까지, 중학교의 결정적 시기를 함께합니다.",
  },
  {
    category: "Elementary",
    imageUrl: "https://media.clsedu.co.kr/programs/elementary_study.jpg",
    title: "초등부",
    description:
      "공부에 대한 흥미를 높이고 올바른 학습 습관을 형성하는 CLS 초등부. 기초부터 차근차근 실력을 쌓습니다.",
  },
];

const DEFAULT_REVIEWS = [
  {
    text: "아이가 배우는 기쁨을 알게 됐어요.",
    author: "- 중2 김OO 학생 학부모님 -",
  },
  {
    text: "작은 성취도 놓치지 않고 칭찬해 주시는 선생님 덕분에, 아이가 항상 학원에 있던 일을 자랑해요.",
    author: "- 초6 O연O 학생 학부모님 -",
  },
  {
    text: "공부도 좋지만 선생님들의 열정에 저도 같이 공부를 열심히 하게 돼요.",
    author: "- 고2 윤OO 학생 -",
  },
  {
    text: "성적이 오른 것보다, 아이 스스로 공부하려는 태도가 생긴 게 더 감사해요.",
    author: "- 중1 박OO 학생 학부모님 -",
  },
  {
    text: "선생님이 아이 이름을 부르며 먼저 말 걸어주실 때마다, 여기가 맞다 싶었어요.",
    author: "- 초5 이OO 학생 학부모님 -",
  },
  {
    text: "내신 대비 자료가 정말 꼼꼼해서 시험 전 불안함이 확 줄었어요.",
    author: "- 중3 최OO 학생 -",
  },
  {
    text: "상담 때 제 걱정을 먼저 알아봐 주셔서 믿고 맡길 수 있었어요.",
    author: "- 고1 정OO 학생 학부모님 -",
  },
  {
    text: "진도보다 이해를 먼저 물어봐 주는 선생님 덕분에 자신감이 생겼어요.",
    author: "- 중2 강OO 학생 -",
  },
  {
    text: "다른 학원은 선생님 얼굴도 모르고 다녔는데, CLS는 달랐어요.",
    author: "- 초4 손OO 학생 학부모님 -",
  },
  {
    text: "수능 끝나고 제일 먼저 연락드린 곳이 여기예요. 정말 감사합니다.",
    author: "- 재수 한OO 학생 -",
  },
];

interface CtaData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const DEFAULT_CTA: CtaData = {
  title: "우리 아이의 변화, 지금부터 시작하세요.",
  description:
    "아이가 스스로 '할 수 있다'는\n변화를 느낄 수 있도록\nCLS 에듀케이션이 끝까지 함께 하겠습니다.",
  buttonText: "상담 및 레벨 테스트 예약",
  buttonLink: "/contact",
};

// ─── 서버사이드 데이터 fetch ───────────────────────────────────────────────────

const PHILOSOPHY_ICONS = [
  <svg key="book" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>,
  <svg key="lightning" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="people" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
];

const PHILOSOPHY_ICON_BG = ["bg-cls-black", "bg-cls-orange", "bg-cls-black"];

async function fetchSection<T>(section: string, fallback: T): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return fallback;
  try {
    const res = await fetch(`${apiUrl}/api/site-content?section=${section}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return fallback;
    const { items } = await res.json();
    return items?.length ? items : fallback;
  } catch {
    return fallback;
  }
}

export default async function Home() {
  // 병렬 fetch
  const [statsItems, philosophyItems, programItems, ctaItems] =
    await Promise.all([
      fetchSection("stats", null),
      fetchSection("home_philosophy", null),
      fetchSection("home_programs", null),
      fetchSection("home_cta", null),
    ]);

  // 통계
  const stats: StatData[] = statsItems
    ? (statsItems as { data: StatData }[]).map((i) => i.data)
    : DEFAULT_STATS;

  // 철학 카드
  const philosophy: { title: string; description: string }[] = philosophyItems
    ? (philosophyItems as { data: { title: string; description: string } }[]).map(
        (i) => i.data
      )
    : DEFAULT_PHILOSOPHY;

  // 프로그램 카드: 고등부 → 중등부 → 초등부 순 강제 정렬
  const PROGRAM_KEY_ORDER: Record<string, number> = { high: 0, middle: 1, elementary: 2 };
  const programs: {
    category: string;
    imageUrl: string;
    title: string;
    description: string;
  }[] = programItems
    ? [
        ...(programItems as {
          key: string;
          data: {
            category: string;
            imageUrl: string;
            title: string;
            description: string;
          };
        }[]),
      ]
        .sort(
          (a, b) =>
            (PROGRAM_KEY_ORDER[a.key] ?? 99) - (PROGRAM_KEY_ORDER[b.key] ?? 99)
        )
        .map((i) => i.data)
    : DEFAULT_PROGRAMS;

  // 하단 CTA 배너
  const ctaRaw = (ctaItems as { key: string; data: Partial<CtaData> }[] | null)?.find(
    (i) => i.key === "main"
  )?.data;
  const cta: CtaData = {
    title: ctaRaw?.title?.trim() || DEFAULT_CTA.title,
    description: ctaRaw?.description?.trim() || DEFAULT_CTA.description,
    buttonText: ctaRaw?.buttonText?.trim() || DEFAULT_CTA.buttonText,
    buttonLink: ctaRaw?.buttonLink?.trim() || DEFAULT_CTA.buttonLink,
  };
  const isExternalCtaLink = /^https?:\/\//i.test(cta.buttonLink);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* Statistics Section */}
      <CountupStats stats={stats} />

      {/* Philosophy Section */}
      <section className="py-10 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-cls-orange font-bold tracking-widest uppercase mb-2 text-xs md:text-base">Philosophy</h2>
            <h3 className="text-2xl md:text-[2.7rem] font-bold text-cls-black mb-3 md:mb-6 tracking-tight">
              &ldquo;최고의 가치는 사람입니다&rdquo;
            </h3>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-light break-keep">
              CLS에듀케이션은 학생 한 명, 한 명을 소중히 여깁니다.<br />
              개별화된 관리와 진심 어린 소통으로<br />
              학생들의 무한한 잠재력을 이끌어냅니다.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-3 md:gap-12 mt-8 md:mt-16">
            {philosophy.map((card, i) => (
              <FadeIn
                key={i}
                delay={(i + 1) * 100}
                className="bg-slate-50 rounded-2xl p-5 md:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                <div className="flex items-center gap-3 md:block">
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 flex-shrink-0 ${PHILOSOPHY_ICON_BG[i % PHILOSOPHY_ICON_BG.length]} text-white rounded-full flex items-center justify-center md:mb-6 shadow-md`}
                  >
                    {PHILOSOPHY_ICONS[i % PHILOSOPHY_ICONS.length]}
                  </div>
                  <h4 className="text-base md:text-xl font-bold text-cls-black md:mb-4">{card.title}</h4>
                </div>
                {isHtmlContent(card.description) ? (
                  <div
                    className="hidden md:block text-gray-600 leading-relaxed font-light prose prose-sm max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.description) }}
                  />
                ) : (
                  <p className="hidden md:block text-gray-600 leading-relaxed font-light">{card.description}</p>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Review Section */}
      <section className="py-10 md:py-24 bg-cls-black text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-lg md:text-3xl font-bold mb-2 break-keep">CLS 에듀케이션을 선택하는 이유</h2>
            <p className="text-xs md:text-sm text-cls-orange font-bold mb-6 md:mb-10">- 학부모님 수강 후기 중 -</p>
            <ReviewCarousel reviews={DEFAULT_REVIEWS} />
          </FadeIn>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-10 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12">
            <div>
              <h2 className="text-cls-orange font-bold tracking-widest uppercase mb-1 text-xs md:text-base">Programs</h2>
              <h3 className="text-2xl md:text-4xl font-bold text-cls-black tracking-tight">대상별 맞춤 프로그램</h3>
            </div>
            <Link href="/program" className="text-cls-black hover:text-cls-orange font-bold mt-2 md:mt-0 flex items-center transition-colors text-sm md:text-base">
              전체 프로그램 보기
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {programs.map((prog, i) => (
              <FadeIn
                key={i}
                delay={(i + 1) * 100}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-row md:flex-col"
              >
                <div className="relative w-28 shrink-0 md:w-full md:h-48 overflow-hidden bg-cls-black/5">
                  <Image
                    src={prog.imageUrl}
                    alt={prog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                </div>
                <div className="p-4 md:p-8 flex-1 flex flex-col justify-center md:block">
                  <div className="text-xs md:text-sm text-cls-orange font-bold mb-1 md:mb-2">{prog.category}</div>
                  <h4 className="text-base md:text-2xl font-bold text-cls-black mb-2 md:mb-4 leading-tight">{prog.title}</h4>
                  {isHtmlContent(prog.description) ? (
                    <div
                      className="hidden md:block text-gray-600 mb-6 font-light h-20 overflow-hidden prose prose-sm max-w-none prose-p:text-gray-600 prose-p:font-light prose-p:my-0"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(prog.description) }}
                    />
                  ) : (
                    <p className="hidden md:block text-gray-600 mb-6 font-light h-20">{prog.description}</p>
                  )}
                  <Link href="/program" className="text-cls-black font-semibold hover:text-cls-orange inline-flex items-center text-sm md:text-base">
                    자세히 보기 &rarr;
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-20 bg-cls-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <FadeIn direction="up" duration={1000}>
            <h2 className="text-xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight break-keep">
              {cta.title}
            </h2>
            <p className="text-sm md:text-xl mb-7 md:mb-10 opacity-90 font-light whitespace-pre-line">
              {"아이가 스스로 '할 수 있다'는\n변화를 느낄 수 있도록\nCLS 에듀케이션이 끝까지 함께 하겠습니다."}
            </p>
            {isExternalCtaLink ? (
              <a
                href={cta.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 md:px-10 md:py-5 bg-white text-cls-black rounded-xl font-bold text-sm md:text-xl shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
              >
                {cta.buttonText}
              </a>
            ) : (
              <Link
                href={cta.buttonLink}
                className="inline-block px-6 py-3 md:px-10 md:py-5 bg-white text-cls-black rounded-xl font-bold text-sm md:text-xl shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
              >
                {cta.buttonText}
              </Link>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
