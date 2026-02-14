"use client";

import { motion } from "framer-motion";
import type { Personal } from "@/types/portfolio";

interface HeroProps {
  personal: Personal;
}

export function Hero({ personal }: HeroProps) {
  const taglineChars = personal.tagline.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1.0,
        staggerChildren: 0.02,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 sm:px-12 lg:px-24"
    >
      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs tracking-wider uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {personal.availability}
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="text-5xl font-bold leading-none tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl"
      >
        {personal.name}
      </motion.h1>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-4 text-sm tracking-widest uppercase sm:text-base"
      >
        {personal.role}
      </motion.p>

      {/* Tagline - character by character reveal */}
      <motion.p
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl"
      >
        {taglineChars.map((char, i) => (
          <motion.span key={i} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-white/40"
        />
      </motion.div>
    </section>
  );
}
