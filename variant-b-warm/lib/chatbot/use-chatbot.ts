"use client";

import { useCallback, useReducer, useRef } from "react";
import { clinic, services, topFaqQuestions } from "@/lib/chatbot/knowledge-base";
import { findBestMatch, isBookingIntent, MATCH_THRESHOLD } from "@/lib/chatbot/matcher";
import {
  formatPhone,
  isValidContact,
  isValidEmail,
} from "@/lib/chatbot/validation";
import type {
  BookingData,
  ChatMessage,
  ChatbotState,
  QuickReply,
} from "@/lib/chatbot/types";
import { initialBookingData } from "@/lib/chatbot/types";

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Date.now().toString(36)}`;
}

const GREETING_TEXT =
  `Hi there! I'm the Crossroads Wellness assistant. I can help you book a consultation or answer questions about our services, hours, and location. How can I help today?`;

const GREETING_QUICK_REPLIES: QuickReply[] = [
  { label: "Book a consultation", value: "Book a consultation" },
  { label: "Our services", value: "What services do you offer?" },
  { label: "Hours & location", value: "What are your hours and where are you located?" },
  ...topFaqQuestions.map((q) => ({ label: q, value: q })),
];

const SERVICE_QUICK_REPLIES: QuickReply[] = services.map((s) => ({
  label: s.shortName,
  value: s.shortName,
}));

function botMessage(
  text: string,
  opts?: { quickReplies?: QuickReply[]; links?: { label: string; href: string }[] }
): ChatMessage {
  return {
    id: nextId("bot"),
    role: "bot",
    text,
    quickReplies: opts?.quickReplies,
    links: opts?.links,
  };
}

function userMessage(text: string): ChatMessage {
  return {
    id: nextId("user"),
    role: "user",
    text,
  };
}

type Action =
  | { type: "reset" }
  | { type: "add"; message: ChatMessage }
  | { type: "addMany"; messages: ChatMessage[] }
  | { type: "setMode"; mode: ChatbotState["mode"] }
  | { type: "setBookingStep"; step: ChatbotState["bookingStep"] }
  | { type: "patchBooking"; patch: Partial<BookingData> }
  | { type: "resetBooking" };

function reducer(state: ChatbotState, action: Action): ChatbotState {
  switch (action.type) {
    case "reset":
      return createInitialState();
    case "add":
      return { ...state, messages: [...state.messages, action.message] };
    case "addMany":
      return { ...state, messages: [...state.messages, ...action.messages] };
    case "setMode":
      return { ...state, mode: action.mode };
    case "setBookingStep":
      return { ...state, bookingStep: action.step };
    case "patchBooking":
      return { ...state, booking: { ...state.booking, ...action.patch } };
    case "resetBooking":
      return { ...state, booking: { ...initialBookingData } };
    default:
      return state;
  }
}

function createInitialState(): ChatbotState {
  return {
    messages: [
      botMessage(GREETING_TEXT, { quickReplies: GREETING_QUICK_REPLIES }),
    ],
    mode: "idle",
    bookingStep: null,
    booking: { ...initialBookingData },
  };
}

const LOW_CONFIDENCE_TEXT =
  "I'm not totally sure I have the right answer for that. Here are some things I can help with, or you can reach our team directly.";

const LOW_CONFIDENCE_QUICK_REPLIES: QuickReply[] = [
  { label: "Our services", value: "What services do you offer?" },
  { label: "Hours & location", value: "What are your hours?" },
  { label: "Book a consultation", value: "Book a consultation" },
];

const LOW_CONFIDENCE_LINKS = [
  { label: "Browse FAQs", href: "/faq" },
  { label: "Contact us", href: "/contact" },
];

export function useChatbot() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  // Track whether the panel content has ever been rendered, so callers can
  // lazy-mount it.
  const hasOpenedRef = useRef(false);

  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const markOpened = useCallback(() => {
    hasOpenedRef.current = true;
  }, []);

  const startBooking = useCallback(() => {
    dispatch({ type: "resetBooking" });
    dispatch({ type: "setMode", mode: "booking" });
    dispatch({ type: "setBookingStep", step: "name" });
    dispatch({
      type: "add",
      message: botMessage(
        "Great — let's get you set up for a consultation. First, what's your full name?"
      ),
    });
  }, []);

  const cancelBooking = useCallback(() => {
    dispatch({ type: "setMode", mode: "idle" });
    dispatch({ type: "setBookingStep", step: null });
    dispatch({ type: "resetBooking" });
    dispatch({
      type: "add",
      message: botMessage(
        "No problem — I've canceled that. Is there anything else I can help with?",
        { quickReplies: GREETING_QUICK_REPLIES }
      ),
    });
  }, []);

  const handleFaqQuery = useCallback((text: string) => {
    const match = findBestMatch(text);
    if (match && match.score >= MATCH_THRESHOLD) {
      dispatch({
        type: "add",
        message: botMessage(match.entry.answer, { links: match.entry.links }),
      });
    } else {
      dispatch({
        type: "add",
        message: botMessage(LOW_CONFIDENCE_TEXT, {
          quickReplies: LOW_CONFIDENCE_QUICK_REPLIES,
          links: LOW_CONFIDENCE_LINKS,
        }),
      });
    }
  }, []);

  const submitBooking = useCallback(async (booking: BookingData) => {
    dispatch({ type: "setBookingStep", step: "submitting" });

    const payload = {
      source: "chatbot" as const,
      name: booking.name,
      email: booking.contactType === "email" ? booking.contactValue : undefined,
      phone: booking.contactType === "phone" ? formatPhone(booking.contactValue) : undefined,
      message: [
        `Service of interest: ${booking.service}`,
        booking.notes ? `Notes: ${booking.notes}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      preferredContact: booking.contactType === "email" ? "Email" : "Phone",
      serviceOfInterest: booking.service,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(
          (data && typeof data.error === "string" && data.error) ||
            "Something went wrong submitting your request."
        );
      }

      dispatch({ type: "setBookingStep", step: "done" });
      dispatch({ type: "setMode", mode: "idle" });
      dispatch({
        type: "add",
        message: botMessage(
          `All set, ${booking.name.split(" ")[0] || "there"}! Your consultation request has been sent. Our care team will follow up by ${
            booking.contactType === "email" ? "email" : "phone or text"
          } shortly. If it's urgent, you can also call or text us at ${clinic.phone}.`,
          { links: [{ label: "Visit homepage", href: "/" }] }
        ),
      });
    } catch (err) {
      dispatch({ type: "setBookingStep", step: "error" });
      const reason = err instanceof Error ? err.message : "Please try again.";
      dispatch({
        type: "add",
        message: botMessage(
          `I wasn't able to submit that automatically (${reason}). You're welcome to try again, or reach our team directly at ${clinic.phone} or ${clinic.email}.`,
          {
            quickReplies: [
              { label: "Try again", value: "__retry_booking__" },
              { label: "Cancel", value: "__cancel_booking__" },
            ],
          }
        ),
      });
    }
  }, []);

  const advanceBooking = useCallback(
    (rawText: string) => {
      const text = rawText.trim();
      const step = state.bookingStep;

      switch (step) {
        case "name": {
          if (text.length < 2) {
            dispatch({
              type: "add",
              message: botMessage(
                "Could you share your full name? (At least 2 characters.)"
              ),
            });
            return;
          }
          dispatch({ type: "patchBooking", patch: { name: text } });
          dispatch({ type: "setBookingStep", step: "service" });
          dispatch({
            type: "add",
            message: botMessage(
              `Thanks, ${text.split(" ")[0]}! Which service are you most interested in?`,
              { quickReplies: SERVICE_QUICK_REPLIES }
            ),
          });
          return;
        }

        case "service": {
          if (text.length < 2) {
            dispatch({
              type: "add",
              message: botMessage(
                "Please choose a service, or type the one you're interested in.",
                { quickReplies: SERVICE_QUICK_REPLIES }
              ),
            });
            return;
          }
          dispatch({ type: "patchBooking", patch: { service: text } });
          dispatch({ type: "setBookingStep", step: "contact" });
          dispatch({
            type: "add",
            message: botMessage(
              "Got it. What's the best email address or phone number to reach you?"
            ),
          });
          return;
        }

        case "contact": {
          if (!isValidContact(text)) {
            dispatch({
              type: "add",
              message: botMessage(
                "That doesn't look like a valid email or phone number. Could you double-check and re-enter it? (e.g. name@example.com or (256) 555-0100)"
              ),
            });
            return;
          }
          const contactType = isValidEmail(text) ? "email" : "phone";
          const contactValue = contactType === "phone" ? formatPhone(text) : text;
          dispatch({
            type: "patchBooking",
            patch: { contactValue, contactType },
          });
          dispatch({ type: "setBookingStep", step: "notes" });
          dispatch({
            type: "add",
            message: botMessage(
              "Anything else you'd like Dr. Adams' team to know — preferred days/times, questions, or notes? (Optional — type 'skip' if not.)"
            ),
          });
          return;
        }

        case "notes": {
          const notes = /^skip$/i.test(text) ? "" : text;
          dispatch({ type: "patchBooking", patch: { notes } });
          dispatch({ type: "setBookingStep", step: "review" });

          const updated: BookingData = { ...state.booking, notes };
          dispatch({
            type: "add",
            message: botMessage(reviewSummary(updated), {
              quickReplies: [
                { label: "Submit request", value: "__submit_booking__" },
                { label: "Start over", value: "__restart_booking__" },
                { label: "Cancel", value: "__cancel_booking__" },
              ],
            }),
          });
          return;
        }

        default:
          return;
      }
    },
    [state.bookingStep, state.booking]
  );

  const sendUserText = useCallback(
    (rawText: string, displayText?: string) => {
      const text = rawText.trim();
      if (!text) return;

      // Special control tokens used by quick-reply chips during booking.
      if (text === "__submit_booking__") {
        dispatch({ type: "add", message: userMessage("Submit request") });
        void submitBooking(state.booking);
        return;
      }
      if (text === "__restart_booking__") {
        dispatch({ type: "add", message: userMessage("Start over") });
        dispatch({ type: "resetBooking" });
        dispatch({ type: "setBookingStep", step: "name" });
        dispatch({
          type: "add",
          message: botMessage("No problem — let's start again. What's your full name?"),
        });
        return;
      }
      if (text === "__cancel_booking__") {
        dispatch({ type: "add", message: userMessage("Cancel") });
        cancelBooking();
        return;
      }
      if (text === "__retry_booking__") {
        dispatch({ type: "add", message: userMessage("Try again") });
        dispatch({ type: "setBookingStep", step: "review" });
        dispatch({
          type: "add",
          message: botMessage(reviewSummary(state.booking), {
            quickReplies: [
              { label: "Submit request", value: "__submit_booking__" },
              { label: "Start over", value: "__restart_booking__" },
              { label: "Cancel", value: "__cancel_booking__" },
            ],
          }),
        });
        return;
      }

      // Echo the user's message (use displayText for nicer chip labels).
      dispatch({ type: "add", message: userMessage(displayText ?? text) });

      // If we're mid-booking, route to the booking step handler.
      if (state.mode === "booking" && state.bookingStep && !["done", "submitting"].includes(state.bookingStep)) {
        advanceBooking(text);
        return;
      }

      // Otherwise check booking intent first, then fall back to FAQ matching.
      if (isBookingIntent(text)) {
        startBooking();
        return;
      }

      handleFaqQuery(text);
    },
    [state.mode, state.bookingStep, state.booking, advanceBooking, startBooking, handleFaqQuery, submitBooking, cancelBooking]
  );

  const sendQuickReply = useCallback(
    (reply: QuickReply) => {
      if (reply.value === "Book a consultation") {
        dispatch({ type: "add", message: userMessage(reply.label) });
        startBooking();
        return;
      }
      sendUserText(reply.value, reply.label);
    },
    [sendUserText, startBooking]
  );

  return {
    state,
    reset,
    markOpened,
    hasOpenedRef,
    sendUserText,
    sendQuickReply,
  };
}

function reviewSummary(booking: BookingData): string {
  const contactLabel = booking.contactType === "email" ? "Email" : "Phone";
  return [
    "Here's what I have — please confirm:",
    `• Name: ${booking.name}`,
    `• Service: ${booking.service}`,
    `• ${contactLabel}: ${booking.contactValue}`,
    booking.notes ? `• Notes: ${booking.notes}` : null,
    "",
    "Submit this to our care team?",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
