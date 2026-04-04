"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePreloaderComplete } from "@/components/preloader";
import type { Personal } from "@/types/portfolio";

interface HeroProps {
  personal: Personal;
}

function SplitText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: delay, staggerChildren: 0.03 },
        },
      }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={{
                hidden: { y: "100%", rotateX: 90 },
                visible: {
                  y: "0%",
                  rotateX: 0,
                  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
              className="inline-block"
              style={{ perspective: "500px" }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

export function Hero({ personal }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const isReady = usePreloaderComplete();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers at different speeds
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [0.4, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const taglineChars = personal.tagline.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1.2,
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
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-24"
    >
      {!isReady ? null : (
        <>
      {/* Subtle dot grid background */}
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ y: badgeY }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs tracking-wider uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {personal.availability}
        </span>
      </motion.div>

      {/* Name — split-text kinetic typography */}
      <motion.h1
        style={{ y: nameY, opacity: nameOpacity, scale: nameScale }}
        className="text-5xl font-bold leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl xl:text-[10rem]"
      >
        <SplitText text={personal.name} delay={0.3} />
      </motion.h1>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ y: taglineY }}
        className="mt-4 text-sm tracking-widest uppercase sm:text-base"
      >
        {personal.role}
      </motion.p>

      {/* Tagline — character by character reveal */}
      <motion.p
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: taglineY }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl"
      >
        {taglineChars.map((char, i) => (
          <motion.span key={i} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>

      {/* Scroll indicator — mouse shape with animated dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="relative flex h-8 w-5 items-start justify-center rounded-full border border-foreground/20 pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-foreground/40"
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/30">
          Scroll
        </span>
      </motion.div>
      </>
      )}
    </section>
  );
}
