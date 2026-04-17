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
    const restore = () => { document.write = origWrite; };

    // roughmapLoader.js 는 document.write() 로 roughmapLander.js <script> 태그를 주입한다.
    // 해당 src를 추출해 직접 onload 핸들러가 있는 스크립트로 교체 로드한다.
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
          new w.daum.roughmap.Lander({
            timestamp: TIMESTAMP,
            key: MAP_KEY,
            mapWidth: "640",
            mapHeight: "360",
          }).render();
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
    <div
      id={CONTAINER_ID}
      className="root_daum_roughmap root_daum_roughmap_landing w-full"
    />
  );
}
