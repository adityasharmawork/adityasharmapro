import type { NextConfig } from "next";

// Keep in sync with SITE_URL in lib/site.ts. Not imported: Node's native TS config
// loader can't resolve the extensionless "@/lib/site" import.
const CANONICAL_ORIGIN = "https://adityasharma.pro";

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
      // Consolidate duplicate hosts onto the canonical apex. Host values are exact-match,
      // so localhost and Vercel preview URLs are unaffected. Written out literally (not
      // .map'd) so `type: "host"` keeps its literal type.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.adityasharma.pro" }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "adityasharmapro.vercel.app" }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
