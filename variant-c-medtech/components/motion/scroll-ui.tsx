"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import type Lenis from "lenis";

function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

/** Smoothly scroll to a target, falling back to native instant jump (reduced motion). */
function smoothScrollTo(target: number | string | HTMLElement, reduce: boolean) {
  const lenis = getLenis();
  if (lenis && !reduce) {
    lenis.scrollTo(target, { duration: 1.1 });
    return;
  }
  // Native fallback.
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
}

/**
 * Thin fixed scroll-progress bar pinned to the very top of the viewport.
 * Stays present under reduced motion (no smoothing spring), purely decorative.
 */
export function ScrollProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
    // Snap instantly when reduced motion is requested.
    ...(reduce ? { stiffness: 1000, damping: 100 } : {}),
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}

/**
 * Floating scroll-to-top button: fades in after ~600px of scroll, returns the
 * user to the top via Lenis (or native scroll under reduced motion). A real
 * <button> with an accessible label and a visible focus ring.
 */
export function ScrollToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll back to top"
          onClick={() => smoothScrollTo(0, !!reduce)}
          className="fixed right-4 bottom-[5.5rem] z-[60] flex size-12 items-center justify-center rounded-full border border-white/60 bg-background/80 text-primary shadow-elevated backdrop-blur-xl transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:right-6 sm:bottom-24"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Intercepts in-page hash anchor clicks so they glide via Lenis instead of the
 * native instant jump. No-ops (lets the browser handle it) under reduced motion.
 */
export function SmoothAnchors() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // Keep the URL hash in sync without a second jump.
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduce]);

  return null;
}
