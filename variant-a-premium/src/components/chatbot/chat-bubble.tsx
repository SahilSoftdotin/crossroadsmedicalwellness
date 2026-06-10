import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/chatbot/types";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";

  return (
    <div className={cn("flex w-full", isBot ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-line rounded-[var(--radius-lg)] px-4 py-2.5 text-sm shadow-[var(--shadow-xs)]",
          isBot
            ? "rounded-bl-sm bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]"
            : "rounded-br-sm bg-[var(--primary)] text-[var(--primary-foreground)]",
        )}
      >
        {message.text}
        {message.links && message.links.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-[var(--border)] pt-2">
            {message.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
