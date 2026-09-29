"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Collapse, useExpandableList } from "@/components/expandable";
import type { WorkEntry } from "@/types/portfolio";

interface WorkProps {
  work: WorkEntry[];
}

const bulletVariants = {
  hidden: { opacity: 0, x: -8, transition: { duration: 0.15 } },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * i, duration: 0.3, ease: "easeOut" as const },
  }),
};

export function Work({ work }: WorkProps) {
  const { activeIndex, isOpen, getItemProps, getTriggerProps, getPanelProps } =
    useExpandableList();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="work" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <h2 className="mb-12 text-xs font-normal tracking-widest uppercase text-foreground/40">
          Some amazing places I worked at
        </h2>
      </ScrollReveal>

      <div ref={timelineRef} className="relative">
        {/* Animated timeline line */}
        <div className="absolute top-0 bottom-0 left-0 hidden w-[2px] bg-border/30 sm:block">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-accent/40"
          />
        </div>

        <div className="space-y-0 sm:pl-8">
          {work.map((entry, i) => (
            <ScrollReveal key={entry.company} delay={i * 0.1}>
              <div className="relative">
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="absolute -left-8 top-10 hidden h-2 w-2 rounded-full border border-accent/50 bg-background sm:block"
                >
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="h-full w-full rounded-full bg-accent/30"
                  />
                </motion.div>

                <motion.div
                  {...getItemProps(i)}
                  animate={{
                    opacity:
                      activeIndex === null || activeIndex === i ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                  className="group border-t border-border py-8 sm:py-10"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium sm:text-xl">
                        <button
                          {...getTriggerProps(i)}
                          className="text-left outline-none focus-visible:underline focus-visible:underline-offset-4"
                        >
                          {entry.role}
                        </button>
                      </h3>
                      <p className="mt-1 text-sm text-foreground/60">
                        {entry.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-sm text-foreground/40 sm:items-end">
                      <span>{entry.date}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} strokeWidth={1.5} />
                        {entry.location}
                      </span>
                    </div>
                  </div>

                  {/* Always rendered (indexable); collapsed until hover, tap, or keyboard focus. */}
                  <Collapse {...getPanelProps(i)}>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">
                      {entry.description}
                    </p>

                    {entry.highlights && entry.highlights.length > 0 && (
                      <motion.ul
                        initial="hidden"
                        animate={isOpen(i) ? "visible" : "hidden"}
                        className="mt-4 max-w-2xl space-y-2 border-l border-foreground/10 pl-4"
                      >
                        {entry.highlights.map((point, j) => (
                          <motion.li
                            key={j}
                            custom={j}
                            variants={bulletVariants}
                            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/50"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </Collapse>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
