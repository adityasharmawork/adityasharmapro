"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Layers, Terminal } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { About as AboutData } from "@/types/portfolio";

interface AboutProps {
  about: AboutData;
}

const highlights = [
  {
    icon: Zap,
    title: "Ship Daily",
    desc: "Plan ruthlessly, code cleanly, ship constantly. I build fast and break less.",
    span: "sm:col-span-2",
  },
  {
    icon: Layers,
    title: "2x Hackathon Winner",
    desc: "Built under pressure, shipped under deadlines, won against hundreds",
    span: "sm:col-span-3",
  },
  // {
  //   icon: Shield,
  //   title: "Contributor at Kubernetes",
  //   desc: "Actively contributing to open source to sharpen my craft — Kubernetes and beyond",
  //   span: "sm:col-span-1",
  // },
  // {
  //   icon: Terminal,
  //   title: "Full Stack to Infra",
  //   desc: "From React to GoLang workers to Cloudflare edge",
  //   span: "sm:col-span-1",
  // },
];

export function About({ about }: AboutProps) {
  return (
    <section id="about" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-12 text-xs tracking-widest uppercase text-foreground/40">
          About
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-6">
        {/* Bio — spans 4 cols on desktop for wider asymmetric look */}
        <ScrollReveal delay={0.1} className="col-span-2 sm:col-span-4">
          <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-white/[0.02] p-6 sm:p-8">
            <p className="text-lg leading-relaxed text-foreground/80 sm:text-xl">
              {about.bio}
            </p>
          </div>
        </ScrollReveal>

        {/* Skills — spans 2 cols on desktop (narrower) */}
        <ScrollReveal delay={0.2} className="col-span-2">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-white/[0.02] p-6 sm:p-8">
            <p className="mb-4 text-xs tracking-widest uppercase text-foreground/40">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
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
                    boxShadow: "0 0 20px rgba(59,130,246,0.2)",
                    transition: { duration: 0.2 },
                  }}
                  className="cursor-default rounded-full border border-border px-4 py-2 text-sm tracking-wide"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Engineering highlights — separate grid with its own column ratio */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {highlights.map((item, i) => (
          <ScrollReveal key={item.title} delay={0.25 + i * 0.08} className={`col-span-1 ${item.span}`}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="group flex h-full flex-col items-start rounded-2xl border border-border bg-white/[0.02] p-6"
            >
              <item.icon
                size={16}
                className="mb-3 text-foreground/40 transition-colors group-hover:text-accent/60"
              />
              <p className="text-sm font-medium text-foreground/90">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/40">
                {item.desc}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
