"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Nanum_Myeongjo } from "next/font/google";
import FadeIn from "@/components/ui/FadeIn";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

// ─── 타입 ─────────────────────────────────────────────────────────────────────
export interface SlideData {
  id?: string | null;
  imageUrl: string;
  title?: string | null;
  subtitle?: string | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
  order?: number;
  isActive?: boolean;
}

export interface SliderSettings {
  autoplayInterval: number;
  transitionSpeed: number;
  transitionEffect: string;
  isRandomized: boolean;
}

// ─── Fisher-Yates 셔플 ────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────
export default function HeroSliderClient({
  slides: initialSlides,
  settings,
}: {
  slides: SlideData[];
  settings: SliderSettings;
}) {
  // SSR과 Hydration 일관성을 위해 초기값은 서버에서 받은 순서 그대로.
  // 랜덤 순서는 마운트 후 useEffect에서 적용한다.
  const [slides, setSlides] = useState<SlideData[]>(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 랜덤 순서 옵션 처리 (클라이언트 마운트 이후)
  useEffect(() => {
    if (settings.isRandomized && initialSlides.length > 1) {
      setSlides(shuffle(initialSlides));
    } else {
      setSlides(initialSlides);
    }
    setCurrentIndex(0);
  }, [initialSlides, settings.isRandomized]);

  // ─── 자동 전환 타이머 ─────────────────────────────────────────────────────
  useEffect(() => {
    if (slides.length <= 1) return;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, settings.autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, settings.autoplayInterval]);

  const displaySlides = slides;
  const currentSlide = displaySlides[currentIndex];
  const hasCustomText = !!currentSlide?.title;

  const transSpeed = `${settings.transitionSpeed}ms`;
  const isSlideEffect = settings.transitionEffect === "slide";

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-cls-black overflow-hidden">
      {/* ─── 배경 이미지 레이어 ──────────────────────────────────────────── */}
      {displaySlides.map((slide, index) => {
        const isActive = index === currentIndex;

        if (isSlideEffect) {
          // 슬라이드 효과: translateX
          let translateX = "100%";
          if (index === currentIndex) translateX = "0%";
          else if (index === (currentIndex - 1 + displaySlides.length) % displaySlides.length) translateX = "-100%";

          return (
            <div
              key={slide.imageUrl}
              className="absolute inset-0 overflow-hidden z-0"
              style={{ transform: `translateX(${translateX})`, transition: `transform ${transSpeed} ease-in-out` }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat will-change-transform"
                style={{
                  backgroundImage: `url('${slide.imageUrl}')`,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  transition: `transform ${settings.autoplayInterval}ms linear`,
                }}
              />
            </div>
          );
        }

        // 페이드 효과 (기본)
        return (
          <div key={slide.imageUrl} className="absolute inset-0 overflow-hidden z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat will-change-transform"
              style={{
                backgroundImage: `url('${slide.imageUrl}')`,
                opacity: isActive ? 0.65 : 0,
                transform: isActive ? "scale(1.12)" : "scale(1)",
                transition: `opacity ${transSpeed} ease-in-out, transform ${settings.autoplayInterval}ms linear`,
              }}
            />
          </div>
        );
      })}

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-cls-black via-cls-black/40 to-cls-black/10 z-[1] pointer-events-none" />

      {/* ─── 슬라이드별 커스텀 텍스트 (설정된 경우만 표시) ────────────────── */}
      {hasCustomText && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20 pointer-events-auto">
            <div
              key={currentIndex}
              style={{ animation: "fadeSlideUp 0.7s ease-out forwards" }}
            >
              {currentSlide.title && (
                <h1 className={`${nanumMyeongjo.className} text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-lg`}>
                  {currentSlide.title}
                </h1>
              )}
              {currentSlide.subtitle && (
                <p className="text-xl sm:text-2xl text-gray-200 font-light mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  {currentSlide.subtitle}
                </p>
              )}
              {currentSlide.ctaLabel && currentSlide.ctaLink && (
                <Link
                  href={currentSlide.ctaLink}
                  className="inline-block px-8 py-4 bg-cls-orange text-white rounded-lg font-bold text-lg shadow-xl hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300"
                >
                  {currentSlide.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── 기본 텍스트 (커스텀 텍스트가 없을 때) ─────────────────────── */}
      {!hasCustomText && (
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20">
          <FadeIn delay={100} duration={800}>
            <span className="inline-block px-4 py-1 rounded-full bg-cls-orange text-white text-sm font-bold tracking-widest mb-6">
              초·중·고 내신 및 입시 전문
            </span>
          </FadeIn>

          <FadeIn delay={300} duration={1000}>
            <h1 className={`${nanumMyeongjo.className} text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-lg`}>
              진짜 실력은 <br className="hidden sm:block" />
              <span className="text-cls-orange">속도</span>가 아니라 <span className="text-cls-orange">깊이</span>에서 나옵니다.
            </h1>
          </FadeIn>

          <FadeIn delay={500} duration={1000}>
            <p className="mt-4 text-xl sm:text-2xl text-gray-200 font-light mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              단순히 지식을 전달하는 곳을 넘어,<br className="sm:hidden" />
              아이들의 학습 습관과 마음까지 세심하게 살핍니다.
            </p>
          </FadeIn>

          <FadeIn delay={700} duration={1000} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/program" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-cls-black transition-all duration-300">
              프로그램 보기
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-cls-orange text-white rounded-lg font-bold text-lg shadow-xl hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300">
              무료 상담 신청하기
            </Link>
          </FadeIn>
        </div>
      )}

      {/* ─── 인디케이터 (슬라이드 2개 이상일 때만) ──────────────────────── */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (timerRef.current) clearInterval(timerRef.current);
                timerRef.current = setInterval(() => {
                  setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
                }, settings.autoplayInterval);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-cls-orange" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
