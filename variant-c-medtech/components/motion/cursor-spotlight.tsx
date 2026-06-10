"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";
import { usePointerFine } from "@/components/motion/use-pointer-fine";

/**
 * A subtle global radial glow that follows the pointer. Desktop + fine-pointer
 * only, aria-hidden, pointer-events-none, and disabled under reduced motion.
 * Low opacity accent so it reads as ambient depth, not a distraction.
 */
export function CursorSpotlight() {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.5 });

  const enabled = pointerFine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  const background = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, color-mix(in oklch, var(--accent), transparent 88%), transparent 70%)`;

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ background }}
    />
  );
}
