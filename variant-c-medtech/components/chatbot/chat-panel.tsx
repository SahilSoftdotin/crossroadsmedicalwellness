"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/data/clinic";
import { useChatEngine } from "@/lib/chatbot/use-chat-engine";
import { ChatMessageBubble } from "@/components/chatbot/chat-message-bubble";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ChatPanelProps = {
  titleId: string;
  onClose: () => void;
};

/**
 * The chatbot panel contents: conversation history, quick replies, and the
 * message input. Rendered only while the launcher is open (lazy mount).
 * Implements a focus trap, ESC-to-close, and click-outside-to-close.
 */
export function ChatPanel({ titleId, onClose }: ChatPanelProps) {
  const router = useRouter();
  const { messages, sendUserText, sendQuickReply, submitting } = useChatEngine();
  const [inputValue, setInputValue] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Focus the input when the panel mounts.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to the newest message.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // ESC to close + focus trap.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleQuickReply(value: string) {
    if (value.startsWith("__link__")) {
      const href = value.replace("__link__", "");
      sendQuickReply(value);
      onClose();
      router.push(href);
      return;
    }
    sendQuickReply(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value || submitting) return;
    sendUserText(value);
    setInputValue("");
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="THRIVE Longevity Center chat assistant"
      aria-labelledby={titleId}
      className="flex h-full max-h-full w-full flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
        <div className="min-w-0">
          <h2 id={titleId} className="truncate font-display text-base font-semibold">
            THRIVE Assistant
          </h2>
          <p className="truncate text-xs text-primary-foreground/70">
            Ask about services, hours, or book a consultation
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close chat"
          className="shrink-0 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Message log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 px-4 py-4"
      >
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <ChatMessageBubble message={message} />
            {message.quickReplies && message.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-9">
                {message.quickReplies.map((reply) => (
                  <button
                    key={`${message.id}-${reply.value}`}
                    type="button"
                    onClick={() => handleQuickReply(reply.value)}
                    disabled={submitting}
                    className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {submitting && (
          <div className="flex items-center gap-2 pl-9 text-xs text-muted-foreground" aria-hidden="true">
            <Loader2 className="size-3.5 animate-spin" />
            Sending your request…
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex shrink-0 items-end gap-2 border-t border-border bg-card p-3">
        <label htmlFor="chatbot-message-input" className="sr-only">
          Type your message
        </label>
        <input
          id="chatbot-message-input"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message…"
          autoComplete="off"
          disabled={submitting}
          className={cn(
            "h-10 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
          )}
        />
        <Button
          type="submit"
          size="icon"
          disabled={submitting || !inputValue.trim()}
          aria-label="Send message"
          className="h-10 w-10 shrink-0"
        >
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>
      <p className="shrink-0 border-t border-border bg-card px-3 pb-2 text-center text-[11px] text-muted-foreground">
        Prefer to talk? Call {clinic.phone} or text {clinic.text}.
      </p>
    </div>
  );
}
