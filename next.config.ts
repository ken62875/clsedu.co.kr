import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 기존에는 `ignoreBuildErrors: true` 로 모든 타입 오류를 무시했지만,
  // 리팩토링 과정에서 주요 오류를 해결했으므로 false 로 전환해 빌드 단계에서 안전망을 확보합니다.
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.clsedu.co.kr",
      },
    ],
  },
};

export default nextConfig;
