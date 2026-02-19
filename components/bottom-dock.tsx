"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Home, User, Briefcase, GitBranch, FolderOpen, Mail, Zap } from "lucide-react";
import { useRef } from "react";

const DOCK_ITEMS = [
  { icon: Home, label: "Home", href: "#hero" },
  { icon: User, label: "About", href: "#about" },
  { icon: Briefcase, label: "Work", href: "#work" },
  { icon: GitBranch, label: "Open Source", href: "#open-source" },
  // { icon: Zap, label: "Freelance", href: "#freelance" },
  { icon: FolderOpen, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const DOCK_ICON_SIZE = 18;
const DOCK_MAGNIFICATION = 1.6;
const DOCK_DISTANCE = 120;

function DockItem({
  icon: Icon,
  label,
  href,
  mouseX,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href: string;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return DOCK_DISTANCE;
    const center = rect.x + rect.width / 2;
    return Math.abs(val - center);
  });

  const scale = useTransform(
    distance,
    [0, DOCK_DISTANCE],
    [DOCK_MAGNIFICATION, 1]
  );

  const springScale = useSpring(scale, {
    stiffness: 300,
    damping: 20,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      style={{ scale: springScale }}
      className="group relative flex items-center justify-center rounded-xl p-2.5 transition-colors hover:bg-white/10"
      data-cursor-hover
    >
      <Icon size={DOCK_ICON_SIZE} strokeWidth={1.5} />
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-white px-2 py-1 text-xs font-medium text-black opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  );
}

export function BottomDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-border bg-black/60 px-3 py-2 backdrop-blur-xl sm:bottom-8 sm:gap-2 sm:px-4"
      role="navigation"
      aria-label="Main navigation"
    >
      {DOCK_ITEMS.map((item) => (
        <DockItem key={item.label} {...item} mouseX={mouseX} />
      ))}
    </motion.nav>
  );
}
