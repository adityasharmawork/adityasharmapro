"use client";

import {
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

type OpenedBy = "hover" | "focus" | "pinned";
type Active = { index: number; by: OpenedBy } | null;

/**
 * One-open-at-a-time list whose details stay in the DOM (so they're indexable)
 * and open on mouse hover, touch/pen tap, or keyboard focus.
 */
export function useExpandableList() {
  const [active, setActive] = useState<Active>(null);
  const lastPointerType = useRef("");
  const skipFocusOpen = useRef(false);
  const baseId = useId();

  const triggerId = (i: number) => `${baseId}-trigger-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;
  const isOpen = (i: number) => active?.index === i;

  const getItemProps = (i: number) => ({
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Hover never steals a card that keyboard focus opened.
      setActive((a) =>
        a?.index === i || a?.by === "focus" ? a : { index: i, by: "hover" }
      );
    },
    onPointerLeave: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setActive((a) => (a?.index === i && a.by === "hover" ? null : a));
    },
    onPointerDown: (e: PointerEvent) => {
      lastPointerType.current = e.pointerType;
    },
    onClick: (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) return;
      // Mouse is already handled by hover. Touch, pen, and Enter/Space (detail 0) toggle.
      if (e.detail > 0 && lastPointerType.current === "mouse") return;
      setActive((a) => (a?.index === i ? null : { index: i, by: "pinned" }));
    },
    onFocus: (e: FocusEvent) => {
      if (skipFocusOpen.current) return;
      // Only keyboard focus; a tap that focuses a button is handled by onClick.
      if (!(e.target as HTMLElement).matches(":focus-visible")) return;
      setActive((a) => (a?.index === i ? a : { index: i, by: "focus" }));
    },
    onBlur: (e: FocusEvent) => {
      if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
      setActive((a) => (a?.index === i && a.by === "focus" ? null : a));
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !isOpen(i)) return;
      setActive(null);
      // The panel goes inert, so pull focus back to the trigger without reopening it.
      skipFocusOpen.current = true;
      document.getElementById(triggerId(i))?.focus();
      skipFocusOpen.current = false;
    },
  });

  const getTriggerProps = (i: number) => ({
    id: triggerId(i),
    type: "button" as const,
    "aria-expanded": isOpen(i),
    "aria-controls": panelId(i),
  });

  const getPanelProps = (i: number) => ({ id: panelId(i), open: isOpen(i) });

  return {
    activeIndex: active?.index ?? null,
    isOpen,
    getItemProps,
    getTriggerProps,
    getPanelProps,
  };
}

/** Height-animating panel that is always rendered; collapsed content is inert (not tabbable). */
export function Collapse({
  id,
  open,
  children,
}: {
  id: string;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)] motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
