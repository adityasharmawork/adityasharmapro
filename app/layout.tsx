import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import dynamic from "next/dynamic";
import { GrainOverlay } from "@/components/grain-overlay";
import { ScrollProgress } from "@/components/scroll-progress";
import { PreloaderProvider } from "@/components/preloader";

const CustomCursor = dynamic(() =>
  import("@/components/custom-cursor").then((m) => m.CustomCursor)
);
const BottomDock = dynamic(() =>
  import("@/components/bottom-dock").then((m) => m.BottomDock)
);
const EasterEggs = dynamic(() =>
  import("@/components/easter-eggs").then((m) => m.EasterEggs)
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityasharmapro.vercel.app"),
  title: "Aditya Sharma",
  description:
    "Software Engineer building scalable systems with TypeScript and GoLang. Open source contributor to Kubernetes. Based in India.",
  openGraph: {
    title: "Aditya Sharma",
    description:
      "Software Engineer building scalable systems with TypeScript and GoLang. Open source contributor to Kubernetes.",
    url: "https://adityasharmapro.vercel.app",
    siteName: "Aditya Sharma",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sharma",
    description:
      "Software Engineer building scalable systems with TypeScript and GoLang.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://pbs.twimg.com" />
        <link rel="preconnect" href="https://abs.twimg.com" />
        <link rel="dns-prefetch" href="https://pbs.twimg.com" />
        <link rel="dns-prefetch" href="https://abs.twimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aditya Sharma",
              url: "https://adityasharmapro.vercel.app",
              jobTitle: "Software Engineer",
              description:
                "Software Engineer building scalable systems with TypeScript and GoLang. Open source contributor to Kubernetes.",
              sameAs: [
                "https://dub.sh/adityagithub",
                "https://dub.sh/adityalinkedin",
                "https://dub.sh/adityax",
              ],
              knowsAbout: [
                "TypeScript",
                "GoLang",
                "Next.js",
                "Kubernetes",
                "System Design",
                "PostgreSQL",
                "Cloudflare",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <PreloaderProvider>
          <GrainOverlay />
          <CustomCursor />
          <ScrollProgress />
          <EasterEggs />
          {children}
          <Analytics />
          <SpeedInsights />
          <BottomDock />
        </PreloaderProvider>
      </body>
    </html>
  );
}
