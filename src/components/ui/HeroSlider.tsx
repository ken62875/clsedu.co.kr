"use client";

import { useState, useEffect } from 'react';

const images = [
  "https://media.clsedu.co.kr/hero-01-clsedu-main-building-rebuild-optimized.jpeg",
  "https://media.clsedu.co.kr/KYJ00897.jpg",
  "https://media.clsedu.co.kr/jeff-sheldon-JWiMShWiF14-unsplash.jpg",
  "https://media.clsedu.co.kr/hero-01-student-studying-hard-optimized.jpeg"
];

// Fisher-Yates 셔플 알고리즘
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function HeroSlider() {
  const [shuffledImages, setShuffledImages] = useState<string[]>(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 클라이언트 마운트 시점에 이미지를 무작위로 섞음
    // Hydration mismatch를 방지하기 위해 useEffect 내에서 처리
    setShuffledImages(shuffleArray(images));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
    }, 5000); // 5초마다 교체
    return () => clearInterval(timer);
  }, [shuffledImages]);

  return (
    <>
      {shuffledImages.map((img, index) => (
        <div key={img} className="absolute inset-0 overflow-hidden z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: index === currentIndex ? 0.6 : 0,
              // 번갈아가며 줌인/줌아웃 느낌을 주기 위해 scale 애니메이션 적용
              transform: index === currentIndex ? 'scale(1.15)' : 'scale(1)',
              transition: 'opacity 1.5s ease-in-out, transform 10s linear'
            }}
          />
        </div>
      ))}

      {/* 텍스트 가독성을 위한 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-cls-black via-cls-black/40 to-cls-black/10 z-0 pointer-events-none" />
    </>
  );
}
