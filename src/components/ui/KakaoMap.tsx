"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const TIMESTAMP = "1776399826983";
const MAP_KEY = "ku9i9nvinet";
const CONTAINER_ID = `daumRoughmapContainer${TIMESTAMP}`;

type DaumWindow = Window & {
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

  function initMap() {
    if (initialized.current) return;
    const w = window as DaumWindow;
    if (!w.daum?.roughmap?.Lander) return;
    initialized.current = true;
    new w.daum.roughmap.Lander({
      timestamp: TIMESTAMP,
      key: MAP_KEY,
      mapWidth: "640",
      mapHeight: "360",
    }).render();
  }

  // 스크립트가 이미 로드된 상태(SPA 재방문)일 때도 초기화
  useEffect(() => {
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        id={CONTAINER_ID}
        className="root_daum_roughmap root_daum_roughmap_landing w-full"
      />
      <Script
        src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"
        strategy="afterInteractive"
        onLoad={initMap}
      />
    </>
  );
}
