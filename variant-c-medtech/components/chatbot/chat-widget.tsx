"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatPanel } from "@/components/chatbot/chat-panel";

/**
 * Site-wide floating chatbot: a launcher button fixed to the bottom-right
 * corner that opens an accessible chat panel. The panel is lazy-rendered —
 * its contents (and the conversation engine) only mount once opened.
 *
 * Positioned at z-[65], between the scroll-progress bar / scroll-to-top
 * button (z-[60]) and the lightbox gallery (z-[70]) so it never collides
 * with other fixed UI. The launcher sits to the left of the scroll-to-top
 * button on small screens via spacing handled in ScrollToTop's own offset.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click-outside to close.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const container = containerRef.current;
      if (!container) return;
      if (event.target instanceof Node && !container.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Restore focus to the launcher when the panel closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <div ref={containerRef} className="fixed right-4 bottom-4 z-[65] sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: reduce ? 0.1 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[66] h-[min(32rem,85dvh)] w-full overflow-hidden rounded-t-2xl border border-border bg-card/95 shadow-elevated backdrop-blur-xl",
              "sm:absolute sm:inset-auto sm:right-0 sm:bottom-[calc(100%+0.75rem)] sm:h-[32rem] sm:w-[23rem] sm:rounded-2xl"
            )}
          >
            <ChatPanel titleId={titleId} onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated ring-1 ring-white/10 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
        <span className="sr-only">{open ? "Close chat assistant" : "Chat with us"}</span>
      </motion.button>
    </div>
  );
}
