import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType, QuickReply } from "@/lib/chatbot/types";

type ChatMessageProps = {
  message: ChatMessageType;
  onQuickReply: (reply: QuickReply) => void;
  disableQuickReplies?: boolean;
};

export function ChatMessageBubble({
  message,
  onQuickReply,
  disableQuickReplies,
}: ChatMessageProps) {
  const isBot = message.role === "bot";

  return (
    <div className={cn("flex w-full flex-col gap-2", isBot ? "items-start" : "items-end")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft-sm",
          isBot
            ? "rounded-bl-sm bg-card text-card-foreground border border-border"
            : "rounded-br-sm bg-primary text-primary-foreground"
        )}
      >
        {message.text}
      </div>

      {isBot && message.links && message.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {message.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="rounded-full border border-terracotta/40 bg-cream-soft px-3 py-1 text-xs font-semibold text-terracotta-dark transition-colors hover:bg-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {isBot && message.quickReplies && message.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {message.quickReplies.map((reply) => (
            <button
              key={reply.label}
              type="button"
              disabled={disableQuickReplies}
              onClick={() => onQuickReply(reply)}
              className="rounded-full border border-sage/50 bg-sage-light/50 px-3 py-1.5 text-xs font-semibold text-sage-dark transition-colors hover:bg-sage-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {reply.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
