import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      { source: "/github", destination: "https://dub.sh/adityagithub", permanent: true },
      { source: "/linkedin", destination: "https://dub.sh/adityalinkedin", permanent: true },
      { source: "/x", destination: "https://dub.sh/adityax", permanent: true },
      { source: "/resume", destination: "https://dub.sh/adityaresume", permanent: true },
    ];
  },
};

export default nextConfig;
