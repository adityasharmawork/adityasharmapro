"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { About as AboutData } from "@/types/portfolio";

interface AboutProps {
  about: AboutData;
}

export function About({ about }: AboutProps) {
  return (
    <section id="about" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-4 text-xs tracking-widest uppercase text-foreground/40">
          About
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="max-w-3xl text-xl leading-relaxed text-foreground/80 sm:text-2xl">
          {about.bio}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-12 flex flex-wrap gap-3">
          {about.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              whileHover={{
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: { duration: 0.2 },
              }}
              className="rounded-full border border-border px-4 py-2 text-sm tracking-wide cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
