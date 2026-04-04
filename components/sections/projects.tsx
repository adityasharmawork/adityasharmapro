"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Project } from "@/types/portfolio";

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-6 sm:p-8 ${
        project.featured ? "w-[85vw] sm:w-[500px]" : "w-[80vw] sm:w-[380px]"
      }`}
      data-cursor-text="View"
    >
      <div>
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-medium sm:text-2xl">{project.title}</h3>
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

      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.a>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = projects.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure the track and compute exact pixel offset needed to show the last card
  const x = useTransform(scrollYProgress, (v) => {
    if (!trackRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = trackWidth - viewportWidth;
    // Use 90% of scroll progress for cards, last 10% to unstick
    const clamped = Math.min(v / 0.9, 1);
    return -maxScroll * clamped;
  });

  // Counter: clamp at total so it never exceeds or restarts
  const currentIndex = useTransform(scrollYProgress, (v) => {
    const clamped = Math.min(v / 0.9, 1);
    return Math.min(Math.ceil(clamped * total), total) || 1;
  });

  return (
    <section id="projects">
      {/* Mobile: standard vertical grid */}
      <div className="px-6 py-32 sm:px-12 md:hidden lg:px-24">
        <ScrollReveal>
          <p className="mb-12 text-xs tracking-widest uppercase text-foreground/40">
            Projects
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border p-6"
                data-cursor-text="View"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      className="text-foreground/40 transition-all group-hover:text-foreground"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
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
      </div>

      {/* Desktop: horizontal scroll showcase */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${total * 40}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* Header row */}
          <div className="flex items-end justify-between px-12 pt-24 pb-8 lg:px-24">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-foreground/40">
                Projects
              </p>
            </ScrollReveal>
            <motion.p className="font-mono text-sm text-foreground/30">
              <motion.span>{currentIndex}</motion.span>
              <span> / {total}</span>
            </motion.p>
          </div>

          {/* Horizontal scrolling cards */}
          <div className="flex flex-1 items-center">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 pl-12 pr-12 lg:pl-24 lg:pr-24"
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
