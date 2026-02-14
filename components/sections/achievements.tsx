"use client";

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
          <ScrollReveal key={achievement.title} delay={i * 0.08}>
            <div className="flex items-start gap-4 border-t border-border py-6">
              <Award
                size={16}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-foreground/40"
              />
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-medium">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {achievement.organization}
                  </p>
                </div>
                <span className="font-mono text-sm text-foreground/30">
                  {achievement.year}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
