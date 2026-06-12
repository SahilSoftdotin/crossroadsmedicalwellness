"use client";

import { useCallback, useRef, useState } from "react";
import { clinic } from "@/lib/data/clinic";
import { findBestMatch, hasBookingIntent } from "@/lib/chatbot/matcher";
import { topSuggestedQuestions } from "@/lib/chatbot/knowledge-base";
import {
  bookingServiceOptions,
  initialBookingData,
  isValidEmail,
  isValidName,
  isValidPhone,
  type BookingData,
  type BookingStep,
} from "@/lib/chatbot/booking";
import type { ChatMessage, QuickReply } from "@/lib/chatbot/types";

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `msg-${idCounter}`;
}

const GREETING_QUICK_REPLIES: QuickReply[] = [
  { label: "Book a consultation", value: "Book a consultation" },
  { label: "Our services", value: "What services do you offer?" },
  { label: "Hours & location", value: "What are your hours and where are you located?" },
  ...topSuggestedQuestions.map((q) => ({ label: q, value: q })),
];

const GREETING_TEXT =
  `Hi! I'm the THRIVE Longevity Center assistant. I can answer quick questions about our services, hours, and location, or help you start a consultation request. What can I help with?`;

function botMessage(text: string, quickReplies?: QuickReply[]): ChatMessage {
  return { id: nextId(), role: "bot", text, quickReplies, announce: true };
}

function userMessage(text: string): ChatMessage {
  return { id: nextId(), role: "user", text };
}

const LOW_CONFIDENCE_TEXT =
  "I'm not totally sure I have a good answer for that yet. Here are some things I can help with:";

const LOW_CONFIDENCE_REPLIES: QuickReply[] = [
  ...topSuggestedQuestions.map((q) => ({ label: q, value: q })),
  { label: "Book a consultation", value: "Book a consultation" },
];

export type ChatEngine = {
  messages: ChatMessage[];
  bookingStep: BookingStep | null;
  sendUserText: (text: string) => void;
  sendQuickReply: (value: string) => void;
  /** True while a /api/lead submission is in flight. */
  submitting: boolean;
  reset: () => void;
};

/**
 * Owns conversation state for the chatbot: message history, FAQ matching,
 * and the deterministic guided-booking step machine. Entirely client-side —
 * the only network call is the existing POST /api/lead.
 */
export function useChatEngine(): ChatEngine {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    botMessage(GREETING_TEXT, GREETING_QUICK_REPLIES),
  ]);
  const [bookingStep, setBookingStep] = useState<BookingStep | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const bookingDataRef = useRef<BookingData>({ ...initialBookingData });

  const pushBot = useCallback((text: string, quickReplies?: QuickReply[]) => {
    setMessages((prev) => [...prev, botMessage(text, quickReplies)]);
  }, []);

  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [...prev, userMessage(text)]);
  }, []);

  const startBooking = useCallback(() => {
    bookingDataRef.current = { ...initialBookingData };
    setBookingStep("name");
    pushBot(
      "Great — let's get a few details so our team can follow up. First, what's your full name?"
    );
  }, [pushBot]);

  const askService = useCallback(() => {
    setBookingStep("service");
    pushBot(
      `Thanks, ${bookingDataRef.current.name.split(/\s+/)[0]}! Which service are you most interested in?`,
      bookingServiceOptions.map((s) => ({ label: s, value: s }))
    );
  }, [pushBot]);

  const askContact = useCallback(() => {
    setBookingStep("contact");
    pushBot(
      "What's the best phone number and email to reach you? You can send them together, e.g. \"(256) 555-0100, name@email.com\"."
    );
  }, [pushBot]);

  const askDetails = useCallback(() => {
    setBookingStep("details");
    pushBot(
      "Anything else to share — a preferred day/time or notes for the team? You can also type \"skip\".",
      [{ label: "Skip", value: "skip" }]
    );
  }, [pushBot]);

  const showReview = useCallback(() => {
    setBookingStep("review");
    const data = bookingDataRef.current;
    const lines = [
      `Name: ${data.name}`,
      `Service: ${data.serviceInterest}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      data.notes ? `Notes: ${data.notes}` : null,
    ].filter(Boolean);
    pushBot(
      `Here's what I have:\n${lines.join("\n")}\n\nReady to send this to our team?`,
      [
        { label: "Submit request", value: "__submit__" },
        { label: "Start over", value: "__restart__" },
      ]
    );
  }, [pushBot]);

  const submitBooking = useCallback(async () => {
    setBookingStep("submitting");
    setSubmitting(true);
    const data = bookingDataRef.current;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: data.name,
          email: data.email,
          phone: data.phone,
          preferredContact: data.preferredContact,
          message: `[Chatbot consultation request] Service interest: ${data.serviceInterest}.${
            data.notes ? ` Notes: ${data.notes}` : ""
          }`,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (!res.ok || !json?.ok) {
        pushBot(
          `Sorry, something went wrong sending your request. Please call us at ${clinic.phone} or text ${clinic.text} and we'll get you booked.`,
          [{ label: "Try again", value: "__submit__" }]
        );
        setBookingStep("review");
        return;
      }

      pushBot(
        `${json.message ?? "Thanks! Your request has been received."} If you need anything sooner, call ${clinic.phone} or text ${clinic.text}.`
      );
      setBookingStep("done");
    } catch {
      pushBot(
        `Sorry, something went wrong sending your request. Please call us at ${clinic.phone} or text ${clinic.text} and we'll get you booked.`,
        [{ label: "Try again", value: "__submit__" }]
      );
      setBookingStep("review");
    } finally {
      setSubmitting(false);
    }
  }, [pushBot]);

  const restart = useCallback(() => {
    bookingDataRef.current = { ...initialBookingData };
    setBookingStep(null);
    pushBot("No problem — what else can I help with?", GREETING_QUICK_REPLIES);
  }, [pushBot]);

  /** Parses "phone, email" (in either order) from free text. */
  const parseContact = (text: string): { phone: string; email: string } | null => {
    const emailMatch = text.match(/[^\s,]+@[^\s,]+\.[^\s,]+/);
    const email = emailMatch ? emailMatch[0] : "";
    const withoutEmail = email ? text.replace(email, "") : text;
    const phoneDigits = withoutEmail.replace(/[^\d]/g, "");
    const phone = phoneDigits.length >= 7 ? withoutEmail.trim().replace(/^[,\s]+|[,\s]+$/g, "") : "";

    if (!email && !phone) return null;
    return { phone, email };
  };

  const handleBookingStep = useCallback(
    (text: string) => {
      const trimmed = text.trim();

      switch (bookingStep) {
        case "name": {
          if (!isValidName(trimmed)) {
            pushBot("That doesn't quite look like a name — could you share your full name?");
            return;
          }
          bookingDataRef.current.name = trimmed;
          askService();
          return;
        }
        case "service": {
          // Accept either an exact chip value or free text.
          bookingDataRef.current.serviceInterest = trimmed;
          askContact();
          return;
        }
        case "contact": {
          const parsed = parseContact(trimmed);
          const validEmail = parsed?.email && isValidEmail(parsed.email);
          const validPhone = parsed?.phone && isValidPhone(parsed.phone);

          if (!validEmail && !validPhone) {
            pushBot(
              "I need at least a valid phone number or email to pass along — could you share one (or both)? For example: \"(256) 555-0100, name@email.com\"."
            );
            return;
          }

          bookingDataRef.current.phone = validPhone ? parsed!.phone : "";
          bookingDataRef.current.email = validEmail ? parsed!.email : "";
          bookingDataRef.current.preferredContact = validPhone ? "phone" : "email";

          if (!validPhone || !validEmail) {
            // Our intake form needs both a phone and email on file — ask for
            // whichever is missing before moving on.
            if (!validPhone) {
              pushBot(
                `Got your email (${bookingDataRef.current.email}). Our team also likes to have a phone number on file — what's the best one to reach you at?`
              );
              setBookingStep("contact-phone");
              return;
            }
            pushBot(
              `Got your phone number (${bookingDataRef.current.phone}). What's the best email address for you?`
            );
            setBookingStep("contact-email");
            return;
          }

          askDetails();
          return;
        }
        case "contact-phone": {
          if (!isValidPhone(trimmed)) {
            pushBot("That doesn't look like a valid phone number — could you double-check it?");
            return;
          }
          bookingDataRef.current.phone = trimmed;
          askDetails();
          return;
        }
        case "contact-email": {
          if (!isValidEmail(trimmed)) {
            pushBot("That doesn't look like a valid email address — could you double-check it?");
            return;
          }
          bookingDataRef.current.email = trimmed;
          bookingDataRef.current.preferredContact = "email";
          askDetails();
          return;
        }
        case "details": {
          bookingDataRef.current.notes = /^skip$/i.test(trimmed) ? "" : trimmed;
          showReview();
          return;
        }
        case "review": {
          if (/^(yes|submit|send|confirm|y|ok|okay)$/i.test(trimmed)) {
            void submitBooking();
            return;
          }
          if (/^(no|restart|start over|cancel)$/i.test(trimmed)) {
            restart();
            return;
          }
          pushBot('Please choose "Submit request" or "Start over" below.', [
            { label: "Submit request", value: "__submit__" },
            { label: "Start over", value: "__restart__" },
          ]);
          return;
        }
        default:
          return;
      }
    },
    [bookingStep, askService, askContact, askDetails, showReview, submitBooking, restart, pushBot]
  );

  const respondToFreeText = useCallback(
    (text: string) => {
      if (hasBookingIntent(text)) {
        startBooking();
        return;
      }

      const match = findBestMatch(text);
      if (!match) {
        pushBot(LOW_CONFIDENCE_TEXT, LOW_CONFIDENCE_REPLIES);
        return;
      }

      const { entry } = match;
      const replies: QuickReply[] | undefined = entry.link
        ? [{ label: entry.link.label, value: `__link__${entry.link.href}` }]
        : undefined;
      pushBot(entry.answer, replies);
    },
    [pushBot, startBooking]
  );

  const sendUserText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      pushUser(trimmed);

      // Special control tokens used by quick-reply chips.
      if (trimmed === "__submit__") {
        void submitBooking();
        return;
      }
      if (trimmed === "__restart__") {
        restart();
        return;
      }
      if (trimmed.startsWith("__link__")) {
        // Handled by the panel via navigation; nothing further to say.
        return;
      }

      if (bookingStep && bookingStep !== "submitting" && bookingStep !== "done") {
        handleBookingStep(trimmed);
        return;
      }

      respondToFreeText(trimmed);
    },
    [bookingStep, handleBookingStep, pushUser, respondToFreeText, restart, submitBooking]
  );

  const sendQuickReply = useCallback(
    (value: string) => {
      sendUserText(value);
    },
    [sendUserText]
  );

  const reset = useCallback(() => {
    bookingDataRef.current = { ...initialBookingData };
    setBookingStep(null);
    setMessages([botMessage(GREETING_TEXT, GREETING_QUICK_REPLIES)]);
  }, []);

  return { messages, bookingStep, sendUserText, sendQuickReply, submitting, reset };
}
