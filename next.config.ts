import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.clsedu.co.kr',
      },
    ],
  },
};

export default nextConfig;
