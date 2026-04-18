import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { GrainOverlay } from "@/components/grain-overlay";
import { CustomCursor } from "@/components/custom-cursor";
import { BottomDock } from "@/components/bottom-dock";
import { ScrollProgress } from "@/components/scroll-progress";
import { PreloaderProvider } from "@/components/preloader";
import { EasterEggs } from "@/components/easter-eggs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Sharma",
  description:
    "Software Engineer building scalable systems with TypeScript and GoLang. Open source contributor to Kubernetes. Based in India.",
  openGraph: {
    title: "Aditya Sharma",
    description:
      "Software Engineer building scalable systems with TypeScript and GoLang. Open source contributor to Kubernetes.",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
