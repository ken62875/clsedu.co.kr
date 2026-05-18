"use client";
import { useEffect, useRef, useState } from "react";

interface WriteOnTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export default function WriteOnText({ text, className = "", duration = 1800 }: WriteOnTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      setActive(true);
      obs.disconnect();
    };

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { threshold: 0 }
    );
    obs.observe(el);

    // 안전 폴백: 3초 후 자동 표시
    const fallback = setTimeout(trigger, 3000);

    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        animation: active
          ? `write-on ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both`
          : undefined,
        clipPath: active ? undefined : "inset(0 100% 0 0)",
      }}
    >
      {text}
    </span>
  );
}
