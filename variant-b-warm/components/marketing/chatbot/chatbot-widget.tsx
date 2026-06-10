"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatbotPanel } from "@/components/marketing/chatbot/chatbot-panel";

export function ChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Hide on patient portal routes — the portal has its own
  // messaging/notifications surface and a different layout shell.
  const isPortalRoute = pathname?.startsWith("/portal");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    // Restore focus to the launcher button.
    launcherRef.current?.focus();
  }

  // Click-outside to close.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      const panel = document.getElementById("chatbot-panel-root");
      const launcher = launcherRef.current;
      if (panel?.contains(target) || launcher?.contains(target)) return;
      setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  // Lock background scroll on mobile while the bottom-sheet is open.
  useEffect(() => {
    if (!isOpen) return;
    const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
    if (!isSmallScreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (isPortalRoute) return null;

  return (
    <>
      {isOpen && (
        <div id="chatbot-panel-root">
          <ChatbotPanel onClose={close} titleId={titleId} />
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (isOpen ? close() : open())}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          "fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft-lg transition-transform hover:scale-105 hover:bg-terracotta-dark focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 active:scale-95 sm:bottom-6 sm:right-6",
          "motion-reduce:transition-none motion-reduce:hover:scale-100"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
