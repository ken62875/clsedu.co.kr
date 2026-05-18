"use client";

import { useEffect, useRef } from "react";

const TIMESTAMP = "1776399826983";
const MAP_KEY = "ku9i9nvinet";
const CONTAINER_ID = `daumRoughmapContainer${TIMESTAMP}`;
const LOADER_URL = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";
const ASPECT = 360 / 640;
// 지도 이미지 아래 툴바(kakaomap | 로드뷰 | 길찾기 | 지도 크게 보기) 높이
const TOOLBAR_HEIGHT = 40;

type RoughmapWindow = Window & {
  daum?: {
    roughmap?: {
      Lander: new (config: {
        timestamp: string;
        key: string;
        mapWidth: string;
        mapHeight: string;
      }) => { render: () => void };
    };
  };
};

export default function KakaoMap() {
  const initialized = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const origWrite = document.write.bind(document);
    const restore = () => { document.write = origWrite; };

    document.write = (content: string) => {
      restore();
      const match = content.match(/src=["']([^"']+)["']/);
      if (!match?.[1]) return;

      const landerScript = document.createElement("script");
      landerScript.charset = "UTF-8";
      landerScript.src = match[1];
      landerScript.onload = () => {
        const w = window as RoughmapWindow;
        if (w.daum?.roughmap?.Lander) {
          const mapWidth = Math.min(wrapperRef.current?.offsetWidth ?? 640, 640);
          const mapHeight = Math.round(mapWidth * ASPECT);
          new w.daum.roughmap.Lander({
            timestamp: TIMESTAMP,
            key: MAP_KEY,
            mapWidth: String(mapWidth),
            mapHeight: String(mapHeight),
          }).render();

          // 렌더 후 지도+툴바만 보이도록 clip — 주소/전화 섹션은 잘려나감
          setTimeout(() => {
            if (wrapperRef.current) {
              wrapperRef.current.style.overflow = "hidden";
              wrapperRef.current.style.maxHeight = `${mapHeight + TOOLBAR_HEIGHT}px`;
            }
          }, 300);
        }
      };
      document.body.appendChild(landerScript);
    };

    const loader = document.createElement("script");
    loader.charset = "UTF-8";
    loader.className = "daum_roughmap_loader_script";
    loader.src = LOADER_URL;
    loader.onerror = restore;

    document.body.appendChild(loader);

    return restore;
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <div
        id={CONTAINER_ID}
        className="root_daum_roughmap root_daum_roughmap_landing"
      />
    </div>
  );
}
