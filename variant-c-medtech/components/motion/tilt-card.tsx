"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { usePointerFine } from "@/components/motion/use-pointer-fine";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Show a subtle moving glare highlight. */
  glare?: boolean;
};

/**
 * 3D tilt-on-hover wrapper. On pointer move the card rotates slightly toward the
 * cursor with perspective, plus an optional soft glare that tracks the pointer.
 *
 * Disabled on touch and under reduced motion — in those cases it renders a plain
 * <div> with no transforms or handlers, so keyboard/touch users get the normal
 * card and focus/hover styles defined by the child are untouched.
 */
export function TiltCard({ children, className, max = 7, glare = true }: TiltCardProps) {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();
  const ref = React.useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.28), transparent 55%)`;

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
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
