"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function Particle({ index }: { index: number }) {
  const x = Math.random() * 100;
  const delay = Math.random() * 0.3;
  const size = 4 + Math.random() * 8;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      initial={{
        x: `${x}vw`,
        y: "-10vh",
        rotate: 0,
        opacity: 1,
      }}
      animate={{
        y: "110vh",
        rotate: rotation + 360,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay,
        ease: "easeIn",
      }}
      className="fixed z-[300] rounded-sm"
      style={{
        width: size,
        height: size,
        backgroundColor:
          index % 3 === 0
            ? "#3b82f6"
            : index % 3 === 1
              ? "#60a5fa"
              : "#93c5fd",
      }}
    />
  );
}

export function EasterEggs() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  }, []);

  useEffect(() => {
    // Console ASCII art
    console.log(
      "%c" +
        "    _    ____  \n" +
        "   / \\  / ___| \n" +
        "  / _ \\ \\___ \\ \n" +
        " / ___ \\ ___) |\n" +
        "/_/   \\_\\____/ \n",
      "color: #3b82f6; font-size: 14px; font-family: monospace;"
    );
    console.log(
      "%cHey there, fellow developer! 👋\nLike what you see? Let's connect → developeradityasharma@gmail.com",
      "color: #94a3b8; font-size: 12px;"
    );
  }, []);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiProgress((prev) => {
        if (e.key === KONAMI[prev]) {
          const next = prev + 1;
          if (next === KONAMI.length) {
            triggerConfetti();
            return 0;
          }
          return next;
        }
        return e.key === KONAMI[0] ? 1 : 0;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerConfetti]);

  return (
    <AnimatePresence>
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-[300]">
          {Array.from({ length: 40 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
