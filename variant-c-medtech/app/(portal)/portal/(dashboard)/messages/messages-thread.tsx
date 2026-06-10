"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatDateTime } from "@/lib/utils";
import { messageThread, type Message } from "@/lib/data/messages";
import { patient } from "@/lib/data/patient";

export function MessagesThread() {
  const [messages, setMessages] = useState<Message[]>(messageThread);
  const [draft, setDraft] = useState("");

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;

    const newMessage: Message = {
      id: `m-local-${Date.now()}`,
      from: "patient",
      authorName: patient.fullName,
      date: new Date().toISOString(),
      body,
    };

    setMessages((prev) => [...prev, newMessage]);
    setDraft("");
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        {messages.map((message) => {
          const fromPatient = message.from === "patient";
          return (
            <div
              key={message.id}
              className={cn("flex gap-3", fromPatient && "flex-row-reverse text-right")}
            >
              <Avatar className="shrink-0">
                <AvatarFallback
                  className={cn(
                    "font-display text-xs font-semibold",
                    fromPatient ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"
                  )}
                >
                  {message.authorName
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className={cn("max-w-[85%] sm:max-w-[70%]", fromPatient && "items-end")}>
                <div className={cn("flex items-baseline gap-2", fromPatient && "flex-row-reverse")}>
                  <p className="text-sm font-semibold text-foreground">{message.authorName}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(message.date)}</p>
                </div>
                <div
                  className={cn(
                    "mt-1 rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    fromPatient
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  {message.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="flex items-end gap-3 border-t border-border p-4 sm:p-5">
        <div className="flex-1">
          <label htmlFor="message-draft" className="sr-only">
            Message your care team
          </label>
          <Textarea
            id="message-draft"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Send a message to your care team..."
            className="resize-none"
          />
        </div>
        <Button type="submit" disabled={!draft.trim()}>
          <Send data-icon="inline-start" />
          Send
        </Button>
      </form>
      <p className="border-t border-border bg-secondary/40 px-5 py-2 text-xs text-muted-foreground">
        Demo only — messages are not sent or stored. For urgent matters, call or text the clinic
        directly.
      </p>
    </div>
  );
}
