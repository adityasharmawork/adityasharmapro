"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  FileText,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Magnetic } from "@/components/magnetic";
import type { Personal, Socials } from "@/types/portfolio";

interface ContactProps {
  personal: Personal;
  socials: Socials;
}

export function Contact({ personal, socials }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: socials.github },
    { icon: Linkedin, label: "LinkedIn", href: socials.linkedin },
    { icon: Twitter, label: "X", href: socials.x },
    { icon: FileText, label: "Resume", href: socials.resume },
  ];

  return (
    <section id="contact" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <p className="mb-8 text-xs tracking-widest uppercase text-foreground/40">
          Contact
        </p>
      </ScrollReveal>

      {/* Massive magnetic "Let's Talk" */}
      <ScrollReveal delay={0.1}>
        <Magnetic strength={0.15}>
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-4"
            data-cursor-hover
          >
            <span className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-7xl">
              Let&apos;s Talk
            </span>
            <ArrowUpRight
              size={40}
              strokeWidth={1}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </Magnetic>
      </ScrollReveal>

      {/* Email + Copy button */}
      <ScrollReveal delay={0.2}>
        <div className="mt-8 flex items-center gap-3">
          <span className="text-sm text-foreground/50">{personal.email}</span>
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-foreground/30"
            data-cursor-hover
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-1"
                >
                  <Check size={12} strokeWidth={1.5} />
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-1"
                >
                  <Copy size={12} strokeWidth={1.5} />
                  Copy Email
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </ScrollReveal>

      {/* Social links with magnetic effect */}
      <ScrollReveal delay={0.3}>
        <div className="mt-16 flex items-center gap-6">
          {socialLinks.map((social) => (
            <Magnetic key={social.label} strength={0.25}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-foreground/40 transition-colors hover:text-foreground"
                data-cursor-hover
              >
                <social.icon size={18} strokeWidth={1.5} />
                <span className="text-sm">{social.label}</span>
              </a>
            </Magnetic>
          ))}
        </div>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal delay={0.4}>
        <div className="mt-24 border-t border-border pt-8 pb-24">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} {personal.name}. All rights
            reserved.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
