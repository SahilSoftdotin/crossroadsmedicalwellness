"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { type Message } from "@/lib/data/messages";
import { patient } from "@/lib/data/patient";

function timeLabel(ts: string) {
  return formatDate(ts, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function MessageThread({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: "patient",
        name: patient.fullName,
        initials: patient.initials,
        timestamp: new Date().toISOString(),
        body,
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-5" aria-label="Message thread">
        {messages.map((m) => {
          const mine = m.author === "patient";
          return (
            <li key={m.id} className={cn("flex gap-3", mine ? "flex-row-reverse" : "flex-row")}>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full text-xs font-medium",
                  mine
                    ? "bg-[var(--brass-200)] text-[var(--brass-700)]"
                    : "bg-[var(--forest-800)] text-[var(--primary-foreground)]",
                )}
                aria-hidden="true"
              >
                {m.initials}
              </span>
              <div className={cn("max-w-[80%]", mine ? "items-end text-right" : "items-start")}>
                <div className={cn("mb-1 flex items-center gap-2 text-xs", mine ? "justify-end" : "justify-start")}>
                  <span className="font-medium text-[var(--foreground)]">{m.name}</span>
                  <span className="text-[var(--muted-foreground)]">{timeLabel(m.timestamp)}</span>
                </div>
                <div
                  className={cn(
                    "inline-block rounded-[var(--radius-lg)] px-4 py-3 text-sm text-left",
                    mine
                      ? "rounded-tr-sm bg-[var(--forest-800)] text-[var(--primary-foreground)]"
                      : "rounded-tl-sm border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
                  )}
                >
                  {m.body}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleSend} className="mt-6 border-t border-[var(--border)] pt-4">
        <label htmlFor="message-body" className="sr-only">
          Write a message to your care team
        </label>
        <Textarea
          id="message-body"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message to your care team…"
          className="min-h-24"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-[var(--muted-foreground)]">
            Demo only — messages stay on this page.
          </p>
          <Button type="submit" variant="primary" size="sm" disabled={!draft.trim()}>
            <Send className="size-4" aria-hidden="true" />
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
