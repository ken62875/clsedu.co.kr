import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/ui/HeroSlider";
import FadeIn from "@/components/ui/FadeIn";
import CountupStats, { type StatData } from "@/components/ui/CountupStats";
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

const DEFAULT_TRUST_REVIEW =
  "아이가 학원 가는 걸 즐거워해요. 무엇보다 우리 아이가 오늘 무엇을 배웠고 어떻게 변하고 있는지 정기적으로 공유해주셔서 정말 안심이 됩니다.";

interface CtaData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const DEFAULT_CTA: CtaData = {
  title: "우리 아이의 변화, 지금부터 시작하세요.",
  description:
    "아이가 스스로 '해냈다'는 변화를 느낄 수 있도록 CLS가 끝까지 함께 걷겠습니다.",
  buttonText: "1:1 상담 및 레벨 테스트 예약",
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
  const [statsItems, philosophyItems, programItems, trustItems, ctaItems] =
    await Promise.all([
      fetchSection("stats", null),
      fetchSection("home_philosophy", null),
      fetchSection("home_programs", null),
      fetchSection("home_trust", null),
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

  // 신뢰 후기
  const trustReview: string =
    trustItems && (trustItems as { data: { content: string } }[]).length > 0
      ? (trustItems as { data: { content: string } }[])[0].data.content
      : DEFAULT_TRUST_REVIEW;

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

      {/* Programs Overview */}
      <section className="py-10 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-12">
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

      {/* Trust & Review Section */}
      <section className="py-24 bg-cls-black text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12">CLS 에듀케이션을 선택하는 이유</h2>
            <div className="bg-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/20 relative">
              <svg className="absolute top-6 left-6 w-12 h-12 text-cls-orange opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              {isHtmlContent(trustReview) ? (
                <div className="text-xl md:text-2xl font-light italic leading-relaxed mb-6 relative z-10 px-8 prose prose-invert max-w-none prose-p:text-white prose-p:font-light prose-p:italic prose-p:leading-relaxed prose-p:my-0">
                  <span aria-hidden>&ldquo;</span>
                  <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(trustReview) }} />
                  <span aria-hidden>&rdquo;</span>
                </div>
              ) : (
                <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-6 relative z-10 px-8">
                  &ldquo;{trustReview}&rdquo;
                </p>
              )}
              <p className="font-bold text-cls-orange">- 학부모님 수강 후기 중 -</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-cls-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <FadeIn direction="up" duration={1000}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              {cta.title}
            </h2>
            {isHtmlContent(cta.description) ? (
              <div
                className="text-lg md:text-xl mb-10 opacity-90 font-light prose prose-invert max-w-none prose-p:text-white prose-p:font-light prose-p:my-0"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(cta.description) }}
              />
            ) : (
              <p className="text-lg md:text-xl mb-10 opacity-90 font-light">
                {cta.description}
              </p>
            )}
            {isExternalCtaLink ? (
              <a
                href={cta.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-white text-cls-black rounded-xl font-extrabold text-xl shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
              >
                {cta.buttonText}
              </a>
            ) : (
              <Link
                href={cta.buttonLink}
                className="inline-block px-10 py-5 bg-white text-cls-black rounded-xl font-extrabold text-xl shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
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
