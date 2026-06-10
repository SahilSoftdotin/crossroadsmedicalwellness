"use client";

import { useState } from "react";
import { Send, MessageSquare, ChevronLeft } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messageThreads as initialThreads } from "@/lib/data/messages";
import { patient } from "@/lib/data/patient";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PortalMessagesPage() {
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState(initialThreads[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [showThreadOnMobile, setShowThreadOnMobile] = useState(false);

  const activeThread = threads.find((t) => t.id === activeId);

  function selectThread(id: string) {
    setActiveId(id);
    setShowThreadOnMobile(true);
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || !activeThread) return;

    const today = new Date().toISOString().slice(0, 10);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              lastUpdated: today,
              messages: [
                ...t.messages,
                {
                  id: `${t.id}-${t.messages.length + 1}`,
                  from: "patient" as const,
                  authorName: patient.fullName,
                  date: today,
                  body: trimmed,
                },
              ],
            }
          : t
      )
    );
    setDraft("");
  }

  return (
    <div>
      <PortalPageHeader
        title="Messages"
        description="Secure messages with your care team. This is a demo — replies are not monitored in real time."
      />

      <div className="grid gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:grid-cols-[20rem_1fr]">
        {/* Thread list */}
        <div
          className={cn(
            "border-border md:border-r",
            showThreadOnMobile ? "hidden md:block" : "block"
          )}
        >
          <div className="border-b border-border p-4">
            <h2 className="font-display text-base font-bold text-brown">
              Conversations
            </h2>
          </div>
          <ul className="divide-y divide-border">
            {threads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => selectThread(thread.id)}
                  aria-current={thread.id === activeId ? "true" : undefined}
                  className={cn(
                    "flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-cream-soft",
                    thread.id === activeId && "bg-cream-soft"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-sm",
                        thread.unread
                          ? "font-bold text-brown"
                          : "font-semibold text-brown"
                      )}
                    >
                      {thread.subject}
                    </p>
                    {thread.unread && (
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-terracotta"
                        aria-label="Unread"
                      />
                    )}
                  </div>
                  <p className="truncate text-xs text-brown-soft">
                    {thread.messages[thread.messages.length - 1].body}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">
                    {formatDate(thread.lastUpdated)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Active thread */}
        <div
          className={cn(
            "flex min-h-[28rem] flex-col",
            showThreadOnMobile ? "flex" : "hidden md:flex"
          )}
        >
          {activeThread ? (
            <>
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full md:hidden"
                  aria-label="Back to conversations"
                  onClick={() => setShowThreadOnMobile(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-bold text-brown">
                    {activeThread.subject}
                  </h2>
                  <p className="text-xs text-brown-soft">
                    Updated {formatDate(activeThread.lastUpdated)}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {activeThread.messages.map((message) => {
                  const isPatient = message.from === "patient";
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col gap-1",
                        isPatient ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
                          isPatient
                            ? "bg-terracotta text-primary-foreground"
                            : "bg-cream-soft text-brown"
                        )}
                      >
                        {message.body}
                      </div>
                      <p className="px-1 text-[11px] text-brown-soft">
                        {message.authorName} &middot; {formatDate(message.date)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <form
                onSubmit={handleSend}
                className="flex items-end gap-2 border-t border-border p-4"
              >
                <label htmlFor="message-draft" className="sr-only">
                  Write a message to your care team
                </label>
                <Textarea
                  id="message-draft"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message to your care team..."
                  rows={2}
                  className="min-h-0 flex-1 resize-none rounded-2xl"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0 rounded-full"
                  aria-label="Send message"
                  disabled={!draft.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="border-t border-border bg-cream-soft px-4 py-2 text-center text-[11px] text-brown-soft">
                Demo only — messages sent here are not delivered to a real
                care team. For urgent issues, call (256) 434-9301.
              </p>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-brown-soft">
              <MessageSquare className="h-8 w-8" />
              <p>Select a conversation to view messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
