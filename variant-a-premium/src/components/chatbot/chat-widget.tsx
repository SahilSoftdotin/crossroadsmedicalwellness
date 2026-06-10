"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatEngine } from "@/lib/chatbot/use-chat-engine";
import { useFocusTrap } from "@/lib/chatbot/use-focus-trap";
import { ChatBubble } from "@/components/chatbot/chat-bubble";
import { ChatChips } from "@/components/chatbot/chat-chips";

const PANEL_ID = "chatbot-panel";
const PANEL_TITLE_ID = "chatbot-panel-title";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, initialize, sendMessage, bookingStep, submitState } = useChatEngine();

  const close = () => setOpen(false);

  function handleToggle() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasOpened(true);
        initialize();
      }
      return next;
    });
  }

  // Focus trap + ESC + focus restore while open.
  useFocusTrap(panelRef, open, close);

  // Close on click outside the panel/launcher.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (launcherRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Auto-scroll to newest message.
  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  // Restore focus to the launcher when the panel closes.
  const wasOpen = useRef(open);
  useEffect(() => {
    if (wasOpen.current && !open) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    sendMessage(text);
    setInputValue("");
    inputRef.current?.focus();
  }

  function handleChipSelect(value: string) {
    sendMessage(value);
    inputRef.current?.focus();
  }

  const isSubmitting = bookingStep === "submitting" || submitState === "submitting";
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      {open ? (
        <div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-labelledby={PANEL_TITLE_ID}
          tabIndex={-1}
          className={cn(
            "fixed z-[60] flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface-muted)] shadow-[var(--shadow-lg)] outline-none",
            // Mobile: near-fullwidth bottom sheet
            "inset-x-3 bottom-3 top-20 rounded-[var(--radius-xl)]",
            // Desktop: fixed card anchored above the launcher, bottom-right
            "sm:inset-x-auto sm:top-auto sm:bottom-24 sm:right-6 sm:h-[34rem] sm:w-[24rem] sm:max-h-[calc(100dvh-7.5rem)]",
            "motion-safe:animate-[chatbot-panel-in_0.18s_ease-out]",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--primary)] px-4 py-3.5 text-[var(--primary-foreground)]">
            <div className="min-w-0">
              <h2
                id={PANEL_TITLE_ID}
                className="font-display text-base font-semibold leading-tight"
              >
                Crossroads Assistant
              </h2>
              <p className="truncate text-xs text-[var(--forest-100)]">
                FAQs &amp; consultation booking
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)]"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col gap-2">
                  <ChatBubble message={message} />
                  {message.role === "bot" && message.chips && message.chips.length > 0 ? (
                    <ChatChips
                      chips={message.chips}
                      onSelect={handleChipSelect}
                      disabled={message.id !== lastMessage?.id || isSubmitting}
                    />
                  ) : null}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* aria-live region announces the latest bot message to screen readers */}
          <div aria-live="polite" role="status" className="sr-only">
            {lastMessage?.role === "bot" ? lastMessage.text : ""}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <div className="flex items-center gap-2">
              <label htmlFor="chatbot-input" className="sr-only">
                Type your message
              </label>
              <input
                ref={inputRef}
                id="chatbot-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message…"
                autoComplete="off"
                disabled={isSubmitting}
                className="flex h-11 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--input)] px-4 py-2 text-sm text-[var(--foreground)] shadow-[var(--shadow-xs)] transition-colors placeholder:text-[var(--charcoal-400)] focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting || !inputValue.trim()}
                aria-label="Send message"
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={hasOpened ? PANEL_ID : undefined}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-4 right-4 z-[61] flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[var(--shadow-lg)] transition-colors duration-200 ease-out hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:translate-y-px sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
