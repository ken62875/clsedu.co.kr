"use client";

import { useState, useEffect } from 'react';

const images = [
  "https://media.clsedu.co.kr/KYJ00897.jpg",
  "https://media.clsedu.co.kr/jeff-sheldon-JWiMShWiF14-unsplash.jpg",
  "https://media.clsedu.co.kr/jerry-wang-jfnUC7s3iuw-unsplash.jpg"
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5초마다 이미지 변경
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-cls-black via-cls-black/80 to-transparent z-0" />
    </>
  );
}
