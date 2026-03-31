"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

export default function FadeIn({ children, delay = 0, direction = "up", className = "", duration = 1000 }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  let translateClass = "";
  if (!isVisible && direction !== "none") {
    switch (direction) {
      case "up": translateClass = "translate-y-12"; break;
      case "down": translateClass = "-translate-y-12"; break;
      case "left": translateClass = "translate-x-12"; break;
      case "right": translateClass = "-translate-x-12"; break;
    }
  }

  return (
    <div
      ref={domRef}
      className={`transition-all ease-out ${className} ${isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 " + translateClass}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
