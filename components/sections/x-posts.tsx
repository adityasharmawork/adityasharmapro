"use client";

import { motion } from "framer-motion";
import { Tweet } from "react-tweet";
import { Component, useEffect, useState, type ReactNode } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TWEET_CARDS } from "@/data/tweets";

function TweetSkeleton() {
  return (
    <div className="animate-pulse p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/[0.06]" />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-white/[0.06]" />
          <div className="h-2 w-16 rounded bg-white/[0.06]" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.06]" />
        <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

function TweetCard({
  rotation,
  children,
}: {
  rotation: number;
  children: ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const effectiveRotation = isMobile ? 0 : rotation;

  return (
    <motion.div
      style={{ rotate: effectiveRotation }}
      whileHover={{
        rotate: 0,
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]"
      data-cursor-text="View"
    >
      {children}
    </motion.div>
  );
}

class TweetErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <TweetSkeleton />;
    return this.props.children;
  }
}

// Distribute cards across columns for staggered masonry
function distributeColumns<T>(items: T[], cols: number): T[][] {
  const columns: T[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    columns[i % cols].push(item);
  });
  return columns;
}

export function XPosts() {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth >= 1024) setColumnCount(3);
      else if (window.innerWidth >= 640) setColumnCount(2);
      else setColumnCount(1);
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columns = distributeColumns(TWEET_CARDS, columnCount);
  const offsets = ["lg:mt-0", "lg:mt-12", "lg:mt-6"];

  return (
    <section id="wall-of-love" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <h2 className="mb-2 text-xs font-normal tracking-widest uppercase text-foreground/40">
          Wall of Love
        </h2>
        <p className="mb-12 text-xl font-medium tracking-tight text-foreground/80 sm:text-2xl">
          Proof &gt; Promises
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {columns.map((column, colIdx) => (
          <div key={colIdx} className={`space-y-4 sm:space-y-5 lg:space-y-6 ${offsets[colIdx] || ""}`}>
            {column.map((card, cardIdx) => {
              const globalIdx = colIdx + cardIdx * columnCount;
              return (
                <ScrollReveal key={card.id} delay={globalIdx * 0.08}>
                  <TweetCard rotation={card.rotation}>
                    <div data-theme="dark" className="react-tweet-theme">
                      <TweetErrorBoundary>
                        <Tweet
                          id={card.id}
                          fallback={<TweetSkeleton />}
                        />
                      </TweetErrorBoundary>
                    </div>
                  </TweetCard>
                </ScrollReveal>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
