"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  GitBranch,
  FolderOpen,
  Mail,
  Zap,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

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
const DRAG_THRESHOLD = 4;
const VIEWPORT_PADDING = 8;

function DockItem({
  icon: Icon,
  label,
  href,
  mouseX,
  wasDragged,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href: string;
  mouseX: MotionValue<number>;
  wasDragged: React.RefObject<boolean>;
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
    // Don't navigate if user just finished dragging
    if (wasDragged.current) return;
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const wasDragged = useRef(false);

  // Drag offset motion values — applied via style={{ x, y }} on the wrapper
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // Pointer start position + saved offset at drag start
  const dragOrigin = useRef<{
    pointerX: number;
    pointerY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  const clampToViewport = useCallback(
    (newX: number, newY: number) => {
      if (!wrapperRef.current) return { x: newX, y: newY };
      const rect = wrapperRef.current.getBoundingClientRect();
      const curX = offsetX.get();
      const curY = offsetY.get();

      // Projected position based on delta from current offset
      const left = rect.left + (newX - curX);
      const right = rect.right + (newX - curX);
      const top = rect.top + (newY - curY);
      const bottom = rect.bottom + (newY - curY);

      let clampedX = newX;
      let clampedY = newY;

      if (left < VIEWPORT_PADDING)
        clampedX = curX + (VIEWPORT_PADDING - rect.left);
      else if (right > window.innerWidth - VIEWPORT_PADDING)
        clampedX = curX + (window.innerWidth - VIEWPORT_PADDING - rect.right);

      if (top < VIEWPORT_PADDING)
        clampedY = curY + (VIEWPORT_PADDING - rect.top);
      else if (bottom > window.innerHeight - VIEWPORT_PADDING)
        clampedY =
          curY + (window.innerHeight - VIEWPORT_PADDING - rect.bottom);

      return { x: clampedX, y: clampedY };
    },
    [offsetX, offsetY]
  );

  // Global pointer move/up listeners for drag
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const origin = dragOrigin.current;
      if (!origin) return;

      const dx = e.clientX - origin.pointerX;
      const dy = e.clientY - origin.pointerY;

      // Activate drag only after exceeding threshold
      if (
        !isDragging &&
        Math.abs(dx) < DRAG_THRESHOLD &&
        Math.abs(dy) < DRAG_THRESHOLD
      ) {
        return;
      }

      if (!isDragging) {
        setIsDragging(true);
        wasDragged.current = true;
        mouseX.set(Infinity);
      }

      const rawX = origin.startOffsetX + dx;
      const rawY = origin.startOffsetY + dy;
      const { x, y } = clampToViewport(rawX, rawY);
      offsetX.set(x);
      offsetY.set(y);
    };

    const handlePointerUp = () => {
      if (dragOrigin.current) {
        dragOrigin.current = null;
        setIsDragging(false);
        // Reset wasDragged flag after a tick so the click event (which fires after pointerup) is suppressed
        requestAnimationFrame(() => {
          wasDragged.current = false;
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, offsetX, offsetY, mouseX, clampToViewport]);

  // Start drag on pointerdown anywhere on the dock
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragOrigin.current = {
        pointerX: e.clientX,
        pointerY: e.clientY,
        startOffsetX: offsetX.get(),
        startOffsetY: offsetY.get(),
      };
    },
    [offsetX, offsetY]
  );

  // Double-click to reset to original position
  const handleDoubleClick = useCallback(() => {
    const springConfig = {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    };
    animate(offsetX, 0, springConfig);
    animate(offsetY, 0, springConfig);
  }, [offsetX, offsetY]);

  return (
    <>
      {/* Wrapper: owns the position + drag offset. Separate from entrance animation. */}
      <motion.div
        ref={wrapperRef}
        style={{ x: offsetX, y: offsetY }}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 sm:bottom-8"
      >
        {/* Nav: owns entrance animation + magnification */}
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          onPointerDown={handlePointerDown}
          onDoubleClick={handleDoubleClick}
          onMouseMove={(e) => {
            if (!isDragging) mouseX.set(e.clientX);
          }}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex cursor-grab items-center gap-1 rounded-2xl border border-border bg-black/60 px-3 py-2 backdrop-blur-xl active:cursor-grabbing sm:gap-2 sm:px-4"
          style={{
            touchAction: "none",
            boxShadow: isDragging
              ? "0 25px 50px -12px rgba(0,0,0,0.5)"
              : "none",
            scale: isDragging ? 1.05 : 1,
            transition: "box-shadow 0.3s ease, scale 0.2s ease",
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          {DOCK_ITEMS.map((item) => (
            <DockItem
              key={item.label}
              {...item}
              mouseX={mouseX}
              wasDragged={wasDragged}
            />
          ))}
        </motion.nav>
      </motion.div>
    </>
  );
}
