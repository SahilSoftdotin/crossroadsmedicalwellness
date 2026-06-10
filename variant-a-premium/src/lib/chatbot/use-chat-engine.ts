import { useCallback, useRef, useState } from "react";
import { clinic } from "@/lib/data/clinic";
import {
  CONFIDENCE_THRESHOLD,
  findBestMatch,
  isBookingIntent,
  topFaqQuestions,
  getEntryById,
} from "@/lib/chatbot/knowledge-base";
import {
  buildLeadPayload,
  initialBookingData,
  isValidContact,
  isValidName,
  serviceOptions,
  type BookingData,
  type BookingStep,
} from "@/lib/chatbot/booking";
import type { ChatChip, ChatMessage } from "@/lib/chatbot/types";

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

const GREETING_CHIPS: ChatChip[] = [
  { label: "Book a consultation", value: "Book a consultation" },
  { label: "Our services", value: "Our services" },
  { label: "Hours & location", value: "Hours & location" },
  ...topFaqQuestions.map((q) => ({ label: q.label, value: q.label })),
];

function botMessage(
  text: string,
  opts?: { chips?: ChatChip[]; links?: { label: string; href: string }[] },
): ChatMessage {
  return { id: nextId("bot"), role: "bot", text, chips: opts?.chips, links: opts?.links };
}

function userMessage(text: string): ChatMessage {
  return { id: nextId("user"), role: "user", text };
}

const SUGGESTION_CHIPS: ChatChip[] = [
  { label: "Book a consultation", value: "Book a consultation" },
  { label: "Our services", value: "Our services" },
  { label: "Hours & location", value: "Hours & location" },
];

function buildReviewText(data: BookingData): string {
  const lines = [
    "Here's what I have — please confirm:",
    `• Name: ${data.name}`,
    `• Service: ${data.service}`,
    data.email ? `• Email: ${data.email}` : null,
    data.phone ? `• Phone: ${data.phone}` : null,
    data.notes ? `• Notes: ${data.notes}` : `• Notes: none`,
  ].filter(Boolean);
  return lines.join("\n");
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function useChatEngine() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [bookingStep, setBookingStep] = useState<BookingStep | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const initialized = useRef(false);
  const bookingDataRef = useRef<BookingData>(initialBookingData);

  const pushMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const updateBookingData = useCallback((updater: (d: BookingData) => BookingData) => {
    bookingDataRef.current = updater(bookingDataRef.current);
  }, []);

  const initialize = useCallback(() => {
    if (initialized.current) return;
    initialized.current = true;
    pushMessage(
      botMessage(
        `Hi! I'm the Crossroads virtual assistant. I can answer quick questions or help you book a consultation with Dr. Adams' team. What can I help with?`,
        { chips: GREETING_CHIPS },
      ),
    );
  }, [pushMessage]);

  const reset = useCallback(() => {
    initialized.current = false;
    setMessages([]);
    setBookingStep(null);
    updateBookingData(() => initialBookingData);
    setSubmitState("idle");
  }, [updateBookingData]);

  /** Begin the guided booking flow. */
  const startBooking = useCallback(() => {
    updateBookingData(() => initialBookingData);
    setBookingStep("name");
    setSubmitState("idle");
    pushMessage(
      botMessage(
        "Great — let's get you scheduled for a consultation. First, what's your full name?",
      ),
    );
  }, [pushMessage, updateBookingData]);

  /** Answer an FAQ / knowledge-base question. */
  const answerQuestion = useCallback(
    (text: string) => {
      const match = findBestMatch(text);

      if (match && match.score >= CONFIDENCE_THRESHOLD) {
        pushMessage(
          botMessage(match.entry.answer, {
            links: match.entry.links,
          }),
        );
        return;
      }

      pushMessage(
        botMessage(
          "I'm not totally sure about that one. Here are some things I can help with — or I can connect you to book a consultation so the team can answer directly.",
          { chips: SUGGESTION_CHIPS },
        ),
      );
    },
    [pushMessage],
  );

  const submitBooking = useCallback(async () => {
    setSubmitState("submitting");
    pushMessage(botMessage("Submitting your request…"));

    try {
      const payload = buildLeadPayload(bookingDataRef.current);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setSubmitState("error");
        setBookingStep("done");
        pushMessage(
          botMessage(
            `${json?.message ?? "Something went wrong submitting your request."} You can also reach us directly at ${clinic.phone} (or text ${clinic.text}).`,
            {
              chips: [{ label: "Try again", value: "start over" }],
            },
          ),
        );
        return;
      }

      setSubmitState("success");
      setBookingStep("done");
      const reference = json?.reference ? ` Your reference number is ${json.reference}.` : "";
      pushMessage(
        botMessage(
          `You're all set!${reference} Our team will reach out within one business day. If anything comes up sooner, call or text us at ${clinic.phone}.`,
          {
            chips: [
              { label: "Ask another question", value: "Our services" },
              { label: "Hours & location", value: "Hours & location" },
            ],
          },
        ),
      );
    } catch {
      setSubmitState("error");
      setBookingStep("done");
      pushMessage(
        botMessage(
          `I couldn't reach our server just now. Please call or text us directly at ${clinic.phone}, or email ${clinic.email}.`,
          {
            chips: [{ label: "Try again", value: "start over" }],
          },
        ),
      );
    }
  }, [pushMessage]);

  /** Step through the deterministic booking conversation. */
  const handleBookingStep = useCallback(
    (text: string) => {
      switch (bookingStep) {
        case "name": {
          if (!isValidName(text)) {
            pushMessage(
              botMessage("That name looks too short — could you share your full name?"),
            );
            return;
          }
          updateBookingData((d) => ({ ...d, name: text }));
          setBookingStep("service");
          pushMessage(
            botMessage(`Thanks, ${text.split(/\s+/)[0]}! Which service are you interested in?`, {
              chips: serviceOptions.map((s) => ({ label: s, value: s })),
            }),
          );
          return;
        }

        case "service": {
          updateBookingData((d) => ({ ...d, service: text }));
          setBookingStep("contact");
          pushMessage(
            botMessage(
              "Got it. What's the best way to reach you — an email address or phone number? (You can share either or both.)",
            ),
          );
          return;
        }

        case "contact": {
          // Try to parse out an email and/or phone from the free text.
          const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
          const phoneMatch = text.match(/[\d\s().+-]{7,}/);
          const email = emailMatch ? emailMatch[0] : "";
          const phone = phoneMatch ? phoneMatch[0].trim() : "";

          if (!isValidContact(email, phone)) {
            pushMessage(
              botMessage(
                "I didn't catch a valid email or phone number. Please share at least one — for example: jane@example.com or (256) 555-0100.",
              ),
            );
            return;
          }

          updateBookingData((d) => ({ ...d, email, phone }));
          setBookingStep("details");
          pushMessage(
            botMessage(
              "Perfect. Any preferred days/times or notes for Dr. Adams' team? (Optional — you can type \"skip\".)",
              { chips: [{ label: "Skip", value: "skip" }] },
            ),
          );
          return;
        }

        case "details": {
          const notes = text.toLowerCase() === "skip" ? "" : text;
          updateBookingData((d) => ({ ...d, notes }));
          pushMessage(
            botMessage(buildReviewText({ ...bookingDataRef.current, notes }), {
              chips: [
                { label: "Confirm & submit", value: "confirm" },
                { label: "Start over", value: "start over" },
              ],
            }),
          );
          setBookingStep("review");
          return;
        }

        case "review": {
          const normalized = text.trim().toLowerCase();
          if (normalized === "start over" || normalized === "restart") {
            updateBookingData(() => initialBookingData);
            setBookingStep("name");
            pushMessage(botMessage("No problem — let's start over. What's your full name?"));
            return;
          }
          if (
            normalized === "confirm" ||
            normalized === "confirm & submit" ||
            normalized === "yes"
          ) {
            setBookingStep("submitting");
            void submitBooking();
            return;
          }
          pushMessage(
            botMessage(
              'Please choose "Confirm & submit" to send your request, or "Start over" to re-enter your details.',
              {
                chips: [
                  { label: "Confirm & submit", value: "confirm" },
                  { label: "Start over", value: "start over" },
                ],
              },
            ),
          );
          return;
        }

        default:
          return;
      }
    },
    [bookingStep, pushMessage, submitBooking, updateBookingData],
  );

  /** Handle a free-text or chip-driven user message. */
  const handleUserInput = useCallback(
    (rawText: string) => {
      const text = rawText.trim();
      if (!text) return;

      pushMessage(userMessage(text));

      // --- Booking flow steps ---
      if (bookingStep) {
        handleBookingStep(text);
        return;
      }

      const normalized = text.toLowerCase();

      if (normalized === "book a consultation" || isBookingIntent(text)) {
        startBooking();
        return;
      }

      if (normalized === "our services") {
        const entry = getEntryById("services-list");
        if (entry) {
          pushMessage(botMessage(entry.answer, { links: entry.links }));
          return;
        }
      }

      if (normalized === "hours & location") {
        const hours = getEntryById("hours");
        const location = getEntryById("location");
        const text2 = [hours?.answer, location?.answer].filter(Boolean).join(" ");
        pushMessage(botMessage(text2, { links: hours?.links }));
        return;
      }

      answerQuestion(text);
    },
    [bookingStep, pushMessage, answerQuestion, startBooking, handleBookingStep],
  );

  /** Handle a "Try again" / "start over" chip after a booking finishes. */
  const handlePostBooking = useCallback(
    (value: string) => {
      if (value.trim().toLowerCase() === "start over") {
        updateBookingData(() => initialBookingData);
        setBookingStep("name");
        pushMessage(userMessage(value));
        pushMessage(botMessage("Sure — let's try again. What's your full name?"));
        return true;
      }
      return false;
    },
    [pushMessage, updateBookingData],
  );

  /** Top-level entry point used by the input + chips. */
  const sendMessage = useCallback(
    (text: string) => {
      if (bookingStep === "done" && text.trim().toLowerCase() === "start over") {
        handlePostBooking(text);
        return;
      }
      handleUserInput(text);
    },
    [bookingStep, handlePostBooking, handleUserInput],
  );

  return {
    messages,
    initialize,
    reset,
    sendMessage,
    bookingStep,
    submitState,
  };
}
