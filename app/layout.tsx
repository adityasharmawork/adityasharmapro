import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import dynamic from "next/dynamic";
import { GrainOverlay } from "@/components/grain-overlay";
import { ScrollProgress } from "@/components/scroll-progress";
import { PreloaderProvider } from "@/components/preloader";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site";

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

// OG/Twitter title + description are omitted on purpose: Next inherits them from the root fields.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  openGraph: {
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
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
