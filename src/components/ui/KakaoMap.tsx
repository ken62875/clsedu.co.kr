"use client";

import { useEffect, useRef } from "react";

const TIMESTAMP = "1776399826983";
const MAP_KEY = "ku9i9nvinet";
const CONTAINER_ID = `daumRoughmapContainer${TIMESTAMP}`;
const LOADER_URL = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";

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

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const origWrite = document.write.bind(document);

    // roughmapLoader.js 는 비동기 로드 시 document.write() 를 호출해 에러가 발생한다.
    // 스크립트 실행 전에 document.write 를 가로채서 컨테이너에 직접 주입한다.
    document.write = (content: string) => {
      const container = document.getElementById(CONTAINER_ID);
      if (!container) return;
      // createContextualFragment 는 <script> 태그도 정상 실행한다
      const fragment = document.createRange().createContextualFragment(content);
      container.appendChild(fragment);
    };

    const restore = () => {
      document.write = origWrite;
    };

    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.className = "daum_roughmap_loader_script";
    script.src = LOADER_URL;

    script.onload = () => {
      restore();
      const w = window as RoughmapWindow;
      if (w.daum?.roughmap?.Lander) {
        new w.daum.roughmap.Lander({
          timestamp: TIMESTAMP,
          key: MAP_KEY,
          mapWidth: "640",
          mapHeight: "360",
        }).render();
      }
    };

    script.onerror = restore;

    document.body.appendChild(script);

    return restore;
  }, []);

  return (
    <div
      id={CONTAINER_ID}
      className="root_daum_roughmap root_daum_roughmap_landing w-full"
    />
  );
}
