export type ChatRole = "bot" | "user";

export type ChatChip = {
  label: string;
  /** Value sent through the conversation handler when the chip is clicked. */
  value: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  /** Optional quick-reply chips shown beneath this message. */
  chips?: ChatChip[];
  /** Optional related-page links shown beneath this message. */
  links?: { label: string; href: string }[];
};
