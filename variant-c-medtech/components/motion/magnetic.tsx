"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { usePointerFine } from "@/components/motion/use-pointer-fine";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** How far (px) the element can drift toward the cursor. */
  strength?: number;
};

/**
 * Wraps interactive content so it gently translates toward the cursor on hover
 * and springs back on leave. The wrapper is a plain <span> (display: contents-ish
 * inline-block) — the child stays a fully accessible button/link.
 *
 * Effect is skipped entirely on touch devices and under reduced motion; in those
 * cases the children render with no transform and no pointer handlers.
 */
export function MagneticButton({ children, className, strength = 14 }: MagneticProps) {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();
  const ref = React.useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const enabled = pointerFine && !reduce;

  const handleMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
