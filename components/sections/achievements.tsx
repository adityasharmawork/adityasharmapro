"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Achievement } from "@/types/portfolio";

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-12 text-xs tracking-widest uppercase text-foreground/40">
          Achievements
        </p>
      </ScrollReveal>

      <div className="space-y-0">
        {achievements.map((achievement, i) => (
          <ScrollReveal key={`${achievement.title}-${i}`} delay={i * 0.08}>
            <motion.div
              whileHover="hovered"
              initial="idle"
              className="group relative flex items-start gap-4 border-t border-border py-6"
            >
              {/* Accent left border on hover */}
              <motion.div
                variants={{
                  idle: { scaleY: 0 },
                  hovered: { scaleY: 1 },
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute top-0 left-0 h-full w-[2px] origin-top bg-accent/50"
              />

              <motion.div
                variants={{
                  idle: { scale: 1 },
                  hovered: { scale: 1.2 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Award
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-foreground/40 transition-colors group-hover:text-accent/60"
                />
              </motion.div>

              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-medium">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {achievement.organization}
                  </p>
                </div>
                <motion.span
                  variants={{
                    idle: { x: 10, opacity: 0.3 },
                    hovered: { x: 0, opacity: 0.6 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm text-foreground/30"
                >
                  {achievement.year}
                </motion.span>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
