"use client";

import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  isVisible: boolean;
  delay: number;
}

function StatCard({ end, label, suffix = "", isVisible, delay }: StatItemProps) {
  const [current, setCurrent] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || hasStarted.current) return;

    hasStarted.current = true;

    // 지연 시간 후 애니메이션 시작
    const timer = setTimeout(() => {
      const duration = 2500; // 2.5초 동안 카운트
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutQuad 이징
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        const value = easeProgress * end;

        setCurrent(value);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrent(end);
        }
      };

      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, delay]);

  // 소수점 표시 로직
  const displayValue = Number.isInteger(end)
    ? Math.round(current).toLocaleString()
    : current.toFixed(1);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-cls-orange mb-2">
        {displayValue}
        <span className="text-xl sm:text-2xl md:text-4xl ml-1">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm md:text-lg text-gray-600 font-light">{label}</p>
    </div>
  );
}

export default function CountupStats() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <StatCard
            end={15000}
            label="누적수강생"
            suffix="+"
            isVisible={isVisible}
            delay={0}
          />
          <StatCard
            end={98.8}
            label="학생만족도"
            suffix="%"
            isVisible={isVisible}
            delay={200}
          />
          <StatCard
            end={5}
            label="평균 수강기간"
            suffix="Year"
            isVisible={isVisible}
            delay={400}
          />
        </div>
      </div>
    </section>
  );
}
