"use client";

import { useState, useEffect } from 'react';

const images = [
  "https://media.clsedu.co.kr/KakaoTalk_Photo_2026-03-31-21-41-01%20001.jpeg",
  "https://media.clsedu.co.kr/KYJ00897.jpg",
  "https://media.clsedu.co.kr/jeff-sheldon-JWiMShWiF14-unsplash.jpg",
  "https://media.clsedu.co.kr/hero-01-student-studying-hard-optimized.jpeg"
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5초마다 교체
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {images.map((img, index) => (
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

      {/* 텍스트 가독성을 위한 그라데이션 오버레이 (투명도 조절하여 이미지가 더 잘 보이게 수정) */}
      <div className="absolute inset-0 bg-gradient-to-t from-cls-black via-cls-black/40 to-cls-black/10 z-0 pointer-events-none" />
    </>
  );
}
