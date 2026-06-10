import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/chatbot/types";

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";

  return (
    <div className={cn("flex w-full items-end gap-2", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Bot className="size-4" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-sm",
          isBot
            ? "rounded-bl-sm border border-border bg-card text-card-foreground"
            : "rounded-br-sm bg-primary text-primary-foreground"
        )}
      >
        {message.text}
      </div>
      {!isBot && (
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
        >
          <User className="size-4" />
        </span>
      )}
    </div>
  );
}
