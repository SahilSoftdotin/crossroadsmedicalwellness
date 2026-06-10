"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Tasteful, once-per-load first-paint reveal for the nav + hero region.
 * Animates opacity + a tiny translateY only (no layout shift), runs a single
 * time, and is fully skipped under reduced motion (renders content immediately).
 */
export function PageEntrance({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
