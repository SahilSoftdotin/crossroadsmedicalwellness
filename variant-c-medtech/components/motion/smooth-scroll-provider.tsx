"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Mounts Lenis smooth scrolling for the marketing experience and syncs it with
 * GSAP's ScrollTrigger so scroll-driven animations stay jitter-free.
 *
 * Fully disabled when the user prefers reduced motion — native scroll is used
 * and no rAF loop / ticker is registered.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // easeOutExpo — premium, decelerating glide.
    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const lenis = new Lenis({
      duration: 1.1,
      easing: easeOutExpo,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Expose for anchor jumps / scroll-to-top.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Keep ScrollTrigger in lock-step with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    // Single rAF source: drive Lenis from gsap.ticker (don't also requestAnimationFrame).
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
