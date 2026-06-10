"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatMessageBubble } from "@/components/marketing/chatbot/chat-message";
import { useChatbot } from "@/lib/chatbot/use-chatbot";
import { clinic } from "@/lib/chatbot/knowledge-base";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ChatbotPanelProps = {
  onClose: () => void;
  titleId: string;
};

export function ChatbotPanel({ onClose, titleId }: ChatbotPanelProps) {
  const { state, sendUserText, sendQuickReply } = useChatbot();
  const [draft, setDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const isSubmitting = state.bookingStep === "submitting";
  const isFinalQuickReplyOnly = state.bookingStep === "review";

  // Focus the input when the panel mounts.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [state.messages]);

  // Announce the latest bot message via aria-live (separate from the
  // visual transcript so screen readers don't re-announce the whole log).
  useEffect(() => {
    const last = state.messages[state.messages.length - 1];
    if (last && last.role === "bot" && liveRegionRef.current) {
      liveRegionRef.current.textContent = last.text;
    }
  }, [state.messages]);

  // Focus trap + ESC handling.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || isSubmitting) return;
    sendUserText(text);
    setDraft("");
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Crossroads Wellness chat assistant"
      aria-labelledby={titleId}
      className={cn(
        "fixed z-[60] flex flex-col overflow-hidden border border-border bg-cream-soft shadow-soft-lg",
        // Mobile: near-fullwidth bottom sheet
        "inset-x-3 bottom-3 top-auto h-[min(34rem,80dvh)] rounded-3xl",
        // Desktop: floating panel above the launcher
        "sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[34rem] sm:w-[24rem] sm:rounded-3xl"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-card px-4 py-3">
        <div className="min-w-0">
          <h2 id={titleId} className="truncate font-display text-base font-bold text-brown">
            {clinic.name}
          </h2>
          <p className="truncate text-xs text-brown-soft">We typically reply right away</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close chat"
          className="shrink-0 rounded-full text-brown-soft hover:bg-clay hover:text-brown"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Transcript */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {state.messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            onQuickReply={sendQuickReply}
            disableQuickReplies={isSubmitting}
          />
        ))}
        {isSubmitting && (
          <div className="flex items-center gap-2 text-xs text-brown-soft">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Sending your request…
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Live region for screen-reader announcements of new bot messages */}
      <div aria-live="polite" className="sr-only" ref={liveRegionRef} />

      {/* Composer */}
      <form onSubmit={handleSubmit} className="border-t border-border bg-card p-3">
        <label htmlFor="chatbot-input" className="sr-only">
          Type your message
        </label>
        <div className="flex items-center gap-2">
          <input
            id="chatbot-input"
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              isFinalQuickReplyOnly
                ? "Use the buttons above, or type a question…"
                : "Type a message…"
            }
            disabled={isSubmitting}
            autoComplete="off"
            className="h-10 w-full min-w-0 rounded-full border border-input bg-cream-soft px-4 text-sm text-brown shadow-xs outline-none placeholder:text-brown-soft/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSubmitting || !draft.trim()}
            aria-label="Send message"
            className="shrink-0 rounded-full shadow-soft"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
