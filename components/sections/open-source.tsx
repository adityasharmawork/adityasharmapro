"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { OpenSourceEntry } from "@/types/portfolio";

interface OpenSourceProps {
    openSource: OpenSourceEntry[];
}

const bulletVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: 0.08 * i, duration: 0.3, ease: "easeOut" as const },
    }),
};

export function OpenSource({ openSource }: OpenSourceProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="open-source" className="px-6 py-32 sm:px-12 lg:px-24">
            <ScrollReveal>
                <p className="mb-12 text-xs tracking-widest uppercase text-foreground/40">
                    Open Source Contributions
                </p>
            </ScrollReveal>

            <div className="space-y-0">
                {openSource.map((entry, i) => (
                    <ScrollReveal key={entry.project} delay={i * 0.1}>
                        <motion.div
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            animate={{
                                opacity:
                                    hoveredIndex === null || hoveredIndex === i ? 1 : 0.3,
                            }}
                            transition={{ duration: 0.3 }}
                            className="group border-t border-border py-8 sm:py-10"
                        >
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium sm:text-xl inline-flex items-center gap-2">
                                        <GitBranch size={18} strokeWidth={1.5} className="text-foreground/40" />
                                        {entry.project}
                                    </h3>
                                    <p className="mt-1 text-sm text-foreground/60">
                                        {entry.role}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start gap-1 text-sm text-foreground/40 sm:items-end">
                                    <a
                                        href={entry.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground/70"
                                    >
                                        <ExternalLink size={12} strokeWidth={1.5} />
                                        View Repository
                                    </a>
                                </div>
                            </div>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: hoveredIndex === i ? "auto" : 0,
                                    opacity: hoveredIndex === i ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">
                                    {entry.description}
                                </p>

                                {entry.highlights && entry.highlights.length > 0 && (
                                    <ul className="mt-4 max-w-2xl space-y-2 border-l border-foreground/10 pl-4">
                                        {entry.highlights.map((point, j) => (
                                            <motion.li
                                                key={j}
                                                custom={j}
                                                initial="hidden"
                                                animate={hoveredIndex === i ? "visible" : "hidden"}
                                                variants={bulletVariants}
                                                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/50"
                                            >
                                                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                                                <span>{point}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        </motion.div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
