"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import * as React from "react";

/**
 * Shared, reduced-motion-aware motion primitives.
 *
 * Every primitive below collapses to a static, fully-visible element when the
 * user prefers reduced motion — content is never hidden behind an animation.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds before the reveal begins. */
  delay?: number;
  /** Pixels to translate up from on entry. */
  y?: number;
  /** Re-animate every time it enters the viewport. */
  once?: boolean;
  as?: keyof typeof motion;
};

/** Fade + rise into view on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — animates direct <StaggerItem> children in sequence. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  once = true,
  ...rest
}: HTMLMotionProps<"div"> & { stagger?: number; once?: boolean }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
  ...rest
}: HTMLMotionProps<"div"> & { y?: number }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={item} {...rest}>
      {children}
    </motion.div>
  );
}

/** Soft hover lift for cards. Disabled under reduced motion. */
export function HoverLift({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Re-export motion + the reduced-motion hook for ad-hoc use. */
export { motion, useReducedMotion };
