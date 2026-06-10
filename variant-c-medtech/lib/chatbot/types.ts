export type ChatRole = "bot" | "user";

export type QuickReply = {
  label: string;
  value: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  quickReplies?: QuickReply[];
  /** When true, screen readers should be informed via aria-live. */
  announce?: boolean;
};

/** A single fact/answer the bot can match against and respond with. */
export type KnowledgeEntry = {
  id: string;
  /** Phrases / keywords used for matching (already lowercase). */
  keywords: string[];
  /** The question text shown as a suggestion chip. */
  question: string;
  answer: string;
  /** Optional related link rendered after the answer. */
  link?: { href: string; label: string };
};
