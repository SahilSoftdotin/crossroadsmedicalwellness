"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroAccent } from "@/components/motion/hero-accent";

/**
 * Healthspan-style hero background: a soft, slowly-flowing aurora/mesh gradient
 * on a light base, with a gentle spotlight behind the headline, fine grain, and
 * a bottom fade that blends into the next section. All drift motion is disabled
 * for prefers-reduced-motion (the gradient field stays, just static).
 */
export function HeroBackground() {
  const reduce = useReducedMotion();

  const drift = (
    x: number[],
    y: number[],
    scale: number[],
    duration: number,
  ) =>
    reduce
      ? undefined
      : {
          x,
          y,
          scale,
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft top wash */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-15%,color-mix(in_oklch,var(--accent),transparent_85%),transparent_60%)]" />

      {/* Flowing aurora blobs */}
      <motion.div
        className="absolute -left-[12%] -top-[28%] size-[46rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent),transparent_55%),transparent_70%)] blur-[100px]"
        style={{ opacity: 0.55 }}
        animate={drift([0, 60, 0], [0, 40, 0], [1, 1.12, 1], 18)}
      />
      <motion.div
        className="absolute -right-[14%] top-[6%] size-[42rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary),transparent_72%),transparent_70%)] blur-[110px]"
        style={{ opacity: 0.5 }}
        animate={drift([0, -50, 0], [0, 30, 0], [1.1, 1, 1.1], 22)}
      />
      <motion.div
        className="absolute bottom-[-30%] left-[22%] size-[40rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent),transparent_66%),transparent_70%)] blur-[120px]"
        style={{ opacity: 0.45 }}
        animate={drift([0, -40, 0], [0, -30, 0], [1, 1.1, 1], 26)}
      />

      {/* Lazy, reduced-motion/desktop-gated R3F accent (falls back to the field above) */}
      <HeroAccent />

      {/* Gentle spotlight behind the headline (left/upper) */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_28%_38%,color-mix(in_oklch,var(--background),transparent_15%),transparent_72%)]" />

      {/* Fine grain for a premium, non-flat surface */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--background)]" />
    </div>
  );
}
