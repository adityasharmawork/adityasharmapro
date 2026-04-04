"use client";

import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Hobby } from "@/types/portfolio";

interface HobbyProps {
  hobby: Hobby;
}

export function HobbySection({ hobby }: HobbyProps) {
  return (
    <section id="youtube-and-articles" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-2 text-xs tracking-widest uppercase text-foreground/40">
          YouTube & Articles
        </p>
        <p className="mb-12 text-xl font-medium tracking-tight text-foreground/80 sm:text-2xl">
          Some Amazing Videos I Made
        </p>
      </ScrollReveal>

      {/* Videos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {hobby.videos.map((video, i) => (
          <ScrollReveal key={video.videoId} delay={i * 0.15}>
            <motion.a
              href={`https://youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white/[0.02]"
              data-cursor-text="Watch"
            >
              {/* Thumbnail with play overlay */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25">
                    <Play
                      size={22}
                      strokeWidth={1.5}
                      className="ml-0.5 text-white"
                      fill="white"
                      fillOpacity={0.9}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium leading-snug sm:text-xl">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                  {video.description}
                </p>
              </div>
            </motion.a>
          </ScrollReveal>
        ))}
      </div>

      {/* Articles */}
      <ScrollReveal>
        <p className="mt-16 mb-8 text-xl font-medium tracking-tight text-foreground/80 sm:text-2xl">
          Do Check These Out
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {hobby.articles.map((article, i) => (
          <ScrollReveal key={article.link} delay={0.1 + i * 0.12}>
            <motion.a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-white/[0.02] p-6"
              data-cursor-text="Read"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium leading-snug sm:text-lg">
                    {article.title}
                  </h3>
                  <div className="mt-0.5 shrink-0 text-foreground/30 transition-all group-hover:text-foreground/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/45">
                  {article.description}
                </p>
              </div>
              <p className="mt-4 text-xs tracking-wide text-foreground/30">
                Blog Post
              </p>
            </motion.a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
