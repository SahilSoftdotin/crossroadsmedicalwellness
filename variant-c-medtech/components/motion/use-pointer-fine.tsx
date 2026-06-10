"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only on devices with a fine pointer (mouse/trackpad) on a
 * reasonably large viewport — i.e. desktop. Used to gate pointer-only effects
 * (magnetic buttons, tilt, cursor spotlight) so touch users are never affected.
 *
 * Defaults to false (SSR-safe) and resolves on mount, so server and first client
 * render agree and pointer effects are purely progressive enhancement.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}
