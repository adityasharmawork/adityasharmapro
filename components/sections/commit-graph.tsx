"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { ContributionData, ContributionDay } from "@/types/github";

const MIN_CELL = 12;
const GAP_PX = 4;
const LABEL_COL = 28;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getContributionColor(count: number, maxCount: number): string {
  if (count === 0) return "var(--contribution-0)";
  const ratio = count / Math.max(maxCount, 1);
  if (ratio <= 0.25) return "var(--contribution-1)";
  if (ratio <= 0.5) return "var(--contribution-2)";
  if (ratio <= 0.75) return "var(--contribution-3)";
  return "var(--contribution-4)";
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface TooltipState {
  date: string;
  count: number;
  x: number;
  y: number;
}

function SkeletonGrid() {
  const cols = 69;
  const rows = 7;

  return (
    <div className="graph-scroll-container overflow-x-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `${LABEL_COL}px repeat(${cols}, 1fr)`,
          gridTemplateRows: `20px repeat(${rows}, auto)`,
          gap: `${GAP_PX}px`,
          minWidth: LABEL_COL + cols * (MIN_CELL + GAP_PX),
        }}
      >
        <div />
        {Array.from({ length: cols }).map((_, i) => (
          <div key={`msk-${i}`} />
        ))}

        {Array.from({ length: rows }).map((_, row) => (
          <>
            <div key={`dsk-${row}`} className="flex items-center">
              {row % 2 === 1 && (
                <motion.div
                  animate={{ opacity: [0.05, 0.15, 0.05] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-2.5 w-5 rounded-sm bg-foreground/10"
                />
              )}
            </div>
            {Array.from({ length: cols }).map((_, col) => (
              <motion.div
                key={`sk-${row}-${col}`}
                animate={{ opacity: [0.03, 0.1, 0.03] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (col * 0.02 + row * 0.01) % 1,
                }}
                className="rounded-sm bg-foreground/[0.06]"
                style={{ aspectRatio: 1 }}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

export function CommitGraph() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: ContributionData) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Unable to load contribution data");
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const maxCount = useMemo(() => {
    if (!data) return 0;
    let max = 0;
    for (const week of data.weeks) {
      for (const day of week.contributionDays) {
        if (day.contributionCount > max) max = day.contributionCount;
      }
    }
    return max;
  }, [data]);

  const monthLabels = useMemo(() => {
    if (!data) return [];
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;

    data.weeks.forEach((week, weekIdx) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return;
      const month = new Date(firstDay.date + "T00:00:00").getMonth();
      if (month !== lastMonth) {
        labels.push({ label: MONTHS[month], col: weekIdx });
        lastMonth = month;
      }
    });

    return labels;
  }, [data]);

  const handleCellHover = useCallback(
    (day: ContributionDay, e: React.MouseEvent) => {
      if (!graphRef.current) return;
      const rect = graphRef.current.getBoundingClientRect();
      setTooltip({
        date: day.date,
        count: day.contributionCount,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleCellLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleCellTouch = useCallback(
    (day: ContributionDay, e: React.TouchEvent) => {
      if (!graphRef.current) return;
      const touch = e.touches[0];
      const rect = graphRef.current.getBoundingClientRect();
      setTooltip({
        date: day.date,
        count: day.contributionCount,
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    },
    []
  );

  if (isLoading) {
    return (
      <section className="px-6 py-20 sm:px-12 lg:px-24">
        <ScrollReveal>
          <p className="mb-2 text-xs tracking-widest uppercase text-foreground/40">
            Contribution Activity
          </p>
          <div className="mb-2 h-8 w-32 rounded bg-foreground/[0.06]" />
          <div className="mb-8 h-4 w-56 rounded bg-foreground/[0.06]" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SkeletonGrid />
        </ScrollReveal>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="px-6 py-20 sm:px-12 lg:px-24">
        <ScrollReveal>
          <p className="mb-2 text-xs tracking-widest uppercase text-foreground/40">
            Contribution Activity
          </p>
          <p className="text-sm text-foreground/30">
            {error ?? "Unable to load contribution data"}
          </p>
        </ScrollReveal>
      </section>
    );
  }

  const totalWeeks = data.weeks.length;
  const gridMinWidth = LABEL_COL + totalWeeks * (MIN_CELL + GAP_PX);

  return (
    <section className="px-6 py-20 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-3 text-xs tracking-widest uppercase text-foreground/40">
          Contribution Activity
        </p>
        <p className="mb-8 text-xl font-medium sm:text-2xl">
          <span className="text-foreground">
            {data.totalContributions.toLocaleString()}+
          </span>
          <span className="text-foreground/40">
            {" "}contributions and counting
          </span>
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="relative" ref={graphRef}>
          {/* Scroll fade hint for mobile */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-10 bg-gradient-to-l from-background to-transparent sm:hidden" />

          <div className="graph-scroll-container overflow-x-auto">
            <div
              className="mx-auto grid"
              style={{
                gridTemplateColumns: `${LABEL_COL}px repeat(${totalWeeks}, 1fr)`,
                gridTemplateRows: `20px repeat(7, auto)`,
                gap: `${GAP_PX}px`,
                minWidth: gridMinWidth,
                maxWidth: LABEL_COL + totalWeeks * (11 + GAP_PX),
              }}
            >
              {/* Top-left corner: empty */}
              <div />

              {/* Month labels */}
              {Array.from({ length: totalWeeks }).map((_, weekIdx) => {
                const monthLabel = monthLabels.find(
                  (m) => m.col === weekIdx
                );
                return (
                  <div
                    key={`month-${weekIdx}`}
                    className="text-[11px] leading-none text-foreground/30"
                  >
                    {monthLabel?.label ?? ""}
                  </div>
                );
              })}

              {/* Day rows */}
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <>
                  {/* Day label */}
                  <div
                    key={`day-label-${dayIdx}`}
                    className="flex items-center text-[11px] leading-none text-foreground/30"
                  >
                    <span className="hidden sm:inline">
                      {dayIdx % 2 === 1 ? DAYS[dayIdx] : ""}
                    </span>
                  </div>

                  {/* Contribution cells */}
                  {data.weeks.map((week, weekIdx) => {
                    const day = week.contributionDays.find(
                      (d) => d.weekday === dayIdx
                    );

                    if (!day) {
                      return (
                        <div
                          key={`empty-${weekIdx}-${dayIdx}`}
                          style={{ aspectRatio: 1 }}
                        />
                      );
                    }

                    return (
                      <motion.div
                        key={`cell-${day.date}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: weekIdx * 0.006,
                          ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="cursor-pointer rounded-sm transition-all duration-150 hover:brightness-150 hover:scale-[1.6] hover:z-10"
                        style={{
                          aspectRatio: 1,
                          backgroundColor: getContributionColor(
                            day.contributionCount,
                            maxCount
                          ),
                        }}
                        onMouseEnter={(e) => handleCellHover(day, e)}
                        onMouseMove={(e) => handleCellHover(day, e)}
                        onMouseLeave={handleCellLeave}
                        onTouchStart={(e) => handleCellTouch(day, e)}
                        onTouchEnd={handleCellLeave}
                      />
                    );
                  })}
                </>
              ))}
            </div>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.1 }}
                className="pointer-events-none absolute z-50 rounded-lg border border-border bg-[#161618] px-3 py-2 shadow-xl backdrop-blur-sm"
                style={{
                  left: Math.max(0, tooltip.x - 70),
                  top: tooltip.y - 56,
                }}
              >
                <p className="text-xs font-medium text-foreground">
                  {tooltip.count} contribution
                  {tooltip.count !== 1 ? "s" : ""}
                </p>
                <p className="text-[10px] text-foreground/50">
                  {formatDate(tooltip.date)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* Legend */}
      <ScrollReveal delay={0.2}>
        <div className="mt-5 flex items-center justify-end gap-2">
          <span className="text-[11px] text-foreground/30">Less</span>
          {[
            "var(--contribution-0)",
            "var(--contribution-1)",
            "var(--contribution-2)",
            "var(--contribution-3)",
            "var(--contribution-4)",
          ].map((color, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: 14,
                height: 14,
                backgroundColor: color,
              }}
            />
          ))}
          <span className="text-[11px] text-foreground/30">More</span>
        </div>
      </ScrollReveal>
    </section>
  );
}
