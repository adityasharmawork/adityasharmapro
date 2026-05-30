"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, createContext, useContext } from "react";

const PreloaderContext = createContext(false);

export function usePreloaderComplete() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("preloader-seen");
    if (hasVisited) {
      setIsLoading(false);
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("preloader-seen", "1");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={isComplete}>
      <AnimatePresence mode="wait" onExitComplete={() => setIsComplete(true)}>
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
            style={{ willChange: "transform" }}
          >
            <motion.span
              initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              className="select-none font-mono text-6xl font-light tracking-tighter text-foreground sm:text-8xl"
            >
              Welcome!
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}
