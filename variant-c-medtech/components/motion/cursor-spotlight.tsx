"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { usePointerFine } from "@/components/motion/use-pointer-fine";

const SIZE = 560;

/**
 * A subtle ambient glow that follows the pointer. Desktop + fine-pointer only,
 * aria-hidden, pointer-events-none, disabled under reduced motion.
 *
 * Performance: moves a fixed-size element via transform (translate) — which is
 * GPU-composited — instead of animating a full-screen `background`, which would
 * repaint the whole viewport on every pointer move and stutter scrolling.
 */
export function CursorSpotlight() {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 140, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 140, damping: 26, mass: 0.4 });
  const tx = useTransform(sx, (v) => v - SIZE / 2);
  const ty = useTransform(sy, (v) => v - SIZE / 2);

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

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] rounded-full"
      style={{
        x: tx,
        y: ty,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, color-mix(in oklch, var(--accent), transparent 86%), transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
