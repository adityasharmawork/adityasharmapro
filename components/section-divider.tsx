"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="flex justify-center py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="h-[1px] w-48 bg-foreground/10"
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}
