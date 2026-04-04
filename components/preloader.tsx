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
    const timer = setTimeout(() => setIsLoading(false), 1800);
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
          >
            <motion.span
              initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="select-none font-mono text-6xl font-light tracking-tighter text-foreground sm:text-8xl"
            >
              AS
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}
