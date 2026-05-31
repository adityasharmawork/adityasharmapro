"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, FileText, Mail, Github, Linkedin } from "lucide-react";
import { usePreloaderComplete } from "@/components/preloader";
import type { Personal, Socials } from "@/types/portfolio";

interface HeroProps {
  personal: Personal;
  socials: Socials;
}

function SplitText({
  text,
  delay = 0,
  className = "",
  active = true,
}: {
  text: string;
  delay?: number;
  className?: string;
  active?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate={active ? "visible" : "hidden"}
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
        <span key={wi} className="inline-block overflow-hidden pb-[0.15em] pt-[0.1em] px-[0.15em] -mx-[0.15em] -mt-[0.1em]">
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

export function Hero({ personal, socials }: HeroProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [contributions, setContributions] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.totalContributions) setContributions(data.totalContributions);
      })
      .catch(() => {});
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Silently fail if clipboard access is denied
    }
  };
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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 sm:px-12 lg:px-24"
    >
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
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
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
        <SplitText text={personal.name} delay={0.3} active={isReady} />
      </motion.h1>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 0.6 } : { opacity: 0 }}
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
        animate={isReady ? "visible" : "hidden"}
        style={{ y: taglineY }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl"
      >
        {taglineChars.map((char, i) => (
          <motion.span key={i} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ y: taglineY }}
        className="mt-8 flex"
      >
        {[
          {
            value: contributions
              ? `${contributions.toLocaleString()}+`
              : "\u2014",
            label: "Contributions",
          },
          { value: "Contributor", label: "Kubernetes" },
          { value: "2\u00d7", label: "Hackathon winner" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`px-3 py-2 sm:px-5 sm:py-3 ${
              i > 0 ? "border-l border-border" : "pl-0"
            }`}
          >
            <p className="font-mono text-sm text-accent sm:text-lg">{stat.value}</p>
            <p className="font-mono text-[10px] tracking-wider uppercase text-foreground/40 sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Action row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        style={{ y: taglineY }}
        className="mt-8 flex flex-col items-start gap-2 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-3"
      >
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-accent/90 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          View work
          <ArrowRight size={12} strokeWidth={2} className="sm:h-3.5 sm:w-3.5" />
        </a>
        <a
          href={socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <FileText size={12} strokeWidth={1.5} className="sm:h-3.5 sm:w-3.5" />
          R&eacute;sum&eacute;
        </a>
        <button
          onClick={handleCopyEmail}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <Mail size={12} strokeWidth={1.5} className="sm:h-3.5 sm:w-3.5" />
          {emailCopied ? "Copied!" : "Email"}
        </button>
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <Github size={12} strokeWidth={1.5} className="sm:h-3.5 sm:w-3.5" />
          GitHub
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <Linkedin size={12} strokeWidth={1.5} className="sm:h-3.5 sm:w-3.5" />
          LinkedIn
        </a>
        <a
          href={socials.x}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 sm:h-3.5 sm:w-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          X
        </a>
      </motion.div>

      {/* Scroll indicator — mouse shape with animated dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="relative flex h-8 w-5 items-start justify-center rounded-full border border-foreground/20 pt-1.5">
          <motion.div
            animate={isReady ? { y: [0, 10, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-foreground/40"
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/30">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
