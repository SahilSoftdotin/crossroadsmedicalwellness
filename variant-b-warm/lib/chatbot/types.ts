export type ChatRole = "bot" | "user";

export type QuickReply = {
  label: string;
  value: string;
};

export type LinkChip = {
  label: string;
  href: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  /** Quick-reply chips shown directly under this message (bot only). */
  quickReplies?: QuickReply[];
  /** Link buttons shown under this message (bot only). */
  links?: LinkChip[];
};

/**
 * The booking flow is a small deterministic state machine. Each step
 * collects one piece of information and validates it before advancing.
 */
export type BookingStep =
  | "name"
  | "service"
  | "contact"
  | "notes"
  | "review"
  | "submitting"
  | "done"
  | "error";

export type BookingData = {
  name: string;
  service: string;
  contactValue: string;
  contactType: "email" | "phone" | "";
  notes: string;
};

export type ConversationMode = "idle" | "booking";

export type ChatbotState = {
  messages: ChatMessage[];
  mode: ConversationMode;
  bookingStep: BookingStep | null;
  booking: BookingData;
};

export const initialBookingData: BookingData = {
  name: "",
  service: "",
  contactValue: "",
  contactType: "",
  notes: "",
};
