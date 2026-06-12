"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { usePointerFine } from "@/components/motion/use-pointer-fine";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
};

/**
 * 3D tilt-on-hover wrapper. On pointer move the card rotates slightly toward the
 * cursor. Only transform (rotateX/rotateY) is animated, which is GPU-composited
 * and cheap — no per-frame background/glare repaint.
 *
 * Disabled on touch and under reduced motion — renders a plain <div> with no
 * transforms or handlers in those cases.
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();
  const ref = React.useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 22,
  });

  const enabled = pointerFine && !reduce;

  const handleMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
