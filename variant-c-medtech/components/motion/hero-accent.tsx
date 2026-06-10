"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the R3F scene with SSR disabled so the three.js bundle
// is never part of the initial server render and never blocks LCP.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/**
 * Gated, lazy mount for the 3D hero accent.
 *
 * Renders nothing (falls back to the existing CSS gradient orbs underneath)
 * when:
 *   - the user prefers reduced motion,
 *   - the viewport is small (mobile / tablet — saves the GPU + bytes),
 *   - or the first idle frame hasn't passed yet (so LCP is never blocked).
 *
 * Always aria-hidden and pointer-events-none.
 */
export function HeroAccent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const large = window.matchMedia("(min-width: 1024px)");

    const evaluate = () => {
      setEnabled(!reduce.matches && large.matches);
    };

    // Defer the first mount until the browser is idle so the hero content
    // (the LCP element) paints first.
    let idleId: number | undefined;
    const ric =
      (window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback;

    if (ric) {
      idleId = ric(evaluate, { timeout: 1500 });
    } else {
      idleId = window.setTimeout(evaluate, 1200) as unknown as number;
    }

    reduce.addEventListener("change", evaluate);
    large.addEventListener("change", evaluate);

    return () => {
      reduce.removeEventListener("change", evaluate);
      large.removeEventListener("change", evaluate);
      const cic = (window as unknown as {
        cancelIdleCallback?: (id: number) => void;
      }).cancelIdleCallback;
      if (idleId !== undefined) {
        if (cic) cic(idleId);
        else clearTimeout(idleId);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-4%] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 opacity-60 blur-[1px] lg:block"
    >
      <HeroScene />
    </div>
  );
}
