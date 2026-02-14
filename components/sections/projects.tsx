"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Project } from "@/types/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-12 text-xs tracking-widest uppercase text-foreground/40">
          Projects
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ScrollReveal
            key={project.title}
            delay={i * 0.1}
            className={project.featured ? "sm:col-span-2" : "sm:col-span-1"}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border p-6 sm:p-8"
              data-cursor-hover
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium sm:text-2xl">
                    {project.title}
                  </h3>
                  <div className="text-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60 sm:text-base">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
