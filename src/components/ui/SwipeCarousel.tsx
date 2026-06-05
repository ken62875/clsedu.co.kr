"use client";

import { Children, useRef, useState, type ReactNode } from "react";

/**
 * 모바일 전용 스와이프 슬라이드.
 * - 모바일(<md): 자식들을 가로 스크롤 슬라이드로 표시 (터치로 좌우 넘김) + 점 인디케이터
 * - 데스크톱(md+): 기존 세로 스택(space-y)으로 표시
 */
export default function SwipeCarousel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 스크롤 중심에 가장 가까운 슬라이드를 활성으로 판정
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(childCenter - center);
      if (dist < min) {
        min = dist;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const goTo = (i: number) => {
    const child = trackRef.current?.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <>
      {/* ── 모바일: 스와이프 슬라이드 ── */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 -mx-5 px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div key={i} className="snap-center shrink-0 w-full">
              {slide}
            </div>
          ))}
        </div>

        {/* 점 인디케이터 */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${i + 1}번째 슬라이드 보기`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-cls-orange" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── 데스크톱: 세로 스택 ── */}
      <div className={`hidden md:block ${className}`}>
        {slides.map((slide, i) => (
          <div key={i}>{slide}</div>
        ))}
      </div>
    </>
  );
}
