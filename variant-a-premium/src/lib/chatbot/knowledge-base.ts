import { clinic } from "@/lib/data/clinic";
import { services } from "@/lib/data/services";
import { faqCategories, type FAQ } from "@/lib/data/faqs";

/**
 * Rule-based knowledge base for the chatbot widget.
 *
 * Combines:
 *  - The site's existing FAQ entries (faqs.ts)
 *  - A small set of hand-written entries derived from clinic.ts / services.ts
 *    for the most common practical questions (hours, location, contact,
 *    services list, pricing, insurance/HSA-FSA).
 *
 * No external API / AI is used — matching is pure token-overlap scoring.
 */

export type KBEntry = {
  id: string;
  /** Sample phrasings used purely for matching (not shown to the user). */
  questions: string[];
  answer: string;
  /** Optional related links shown as chips under the answer. */
  links?: { label: string; href: string }[];
};

const hoursLines = clinic.hours.map((h) => `${h.day}: ${h.value}`).join(", ");

const servicesList = services.map((s) => s.shortName).join(", ");

/** Hand-written entries for common practical questions. */
const builtInEntries: KBEntry[] = [
  {
    id: "hours",
    questions: [
      "what are your hours",
      "when are you open",
      "office hours",
      "what time do you open",
      "what time do you close",
      "are you open today",
      "are you open on weekends",
      "business hours",
    ],
    answer: `Our hours are ${hoursLines}.`,
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    id: "location",
    questions: [
      "where are you located",
      "what is your address",
      "directions to the office",
      "where is the clinic",
      "location",
      "address",
    ],
    answer: `We're located at ${clinic.address.full}.`,
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    id: "contact",
    questions: [
      "how do i contact you",
      "phone number",
      "can i text you",
      "email address",
      "how can i reach you",
      "call you",
    ],
    answer: `You can call us at ${clinic.phone}, text us at ${clinic.text}, or email ${clinic.email}.`,
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    id: "services-list",
    questions: [
      "what services do you offer",
      "what treatments do you have",
      "what do you offer",
      "list your services",
      "what programs do you have",
      "what kind of care do you provide",
    ],
    answer: `We offer ${servicesList}. Each can be tailored into a personalized program after a consultation.`,
    links: [{ label: "Our services", href: "/services" }],
  },
  {
    id: "pricing",
    questions: [
      "how much does it cost",
      "what is the price",
      "pricing",
      "cost of treatment",
      "how much is hormone therapy",
      "how much is weight loss program",
      "is it expensive",
    ],
    answer:
      "Pricing depends on your individualized plan and is quoted at your consultation. Many services are self-pay, and HSA/FSA funds may apply depending on your plan.",
    links: [
      { label: "Book a consultation", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    id: "insurance",
    questions: [
      "do you take insurance",
      "do you accept insurance",
      "is this covered by insurance",
      "hsa",
      "fsa",
      "can i use my hsa",
      "can i use my fsa",
      "insurance accepted",
    ],
    answer:
      "Many of our integrative and wellness services are offered on a self-pay basis. HSA and FSA funds can often be used, depending on your plan — we're happy to provide documentation for your claim.",
    links: [{ label: "FAQ", href: "/faq" }],
  },
  {
    id: "provider",
    questions: [
      "who is the doctor",
      "who will i see",
      "who is dr adams",
      "tell me about the provider",
      "is this a real doctor",
    ],
    answer: `Dr. Gary Adams, ${clinic.provider.credentials}, leads Crossroads with ${clinic.provider.experience} of experience. The practice is physician-owned and combines conventional medicine with root-cause, integrative care.`,
    links: [{ label: "About", href: "/about" }],
  },
];

/** Convert the site's FAQ data into matchable knowledge-base entries. */
const faqEntries: KBEntry[] = faqCategories.flatMap((category) =>
  category.items.map((item: FAQ, idx: number) => ({
    id: `faq-${category.category}-${idx}`.toLowerCase().replace(/\s+/g, "-"),
    questions: [item.question],
    answer: item.answer,
    links: [{ label: "All FAQs", href: "/faq" }],
  })),
);

export const knowledgeBase: KBEntry[] = [...builtInEntries, ...faqEntries];

/** Top FAQ questions surfaced as quick-reply chips when the chat opens. */
export const topFaqQuestions: { label: string; entryId: string }[] = [
  { label: faqCategories[0].items[0].question, entryId: "faq-getting-started-0" },
  { label: faqCategories[3].items[2].question, entryId: "faq-billing-&-logistics-2" },
  { label: faqCategories[2].items[0].question, entryId: "faq-treatments-&-programs-0" },
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "do",
  "does",
  "did",
  "i",
  "you",
  "your",
  "yours",
  "we",
  "me",
  "my",
  "to",
  "of",
  "for",
  "in",
  "on",
  "at",
  "and",
  "or",
  "what",
  "what's",
  "how",
  "can",
  "with",
  "it",
  "this",
  "that",
  "be",
  "have",
  "has",
  "about",
  "please",
  "would",
  "will",
  "there",
  "any",
]);

/** Normalize text: lowercase, strip punctuation, collapse whitespace. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tokenize normalized text into significant words (stop words removed). */
export function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export type MatchResult = {
  entry: KBEntry;
  score: number;
};

/**
 * Score a user query against a knowledge-base entry using Jaccard token
 * overlap (intersection / union), with bonus weight for direct substring
 * matches against the entry's sample questions.
 *
 * Jaccard is used (rather than overlap / smaller-set-size) so that a single
 * shared filler word between a short query and a short sample question
 * ("what is the weather today" vs. "are you open today") doesn't produce a
 * false-positive confident match.
 */
function scoreEntry(queryTokens: string[], entry: KBEntry): number {
  if (queryTokens.length === 0) return 0;

  const querySet = new Set(queryTokens);
  let best = 0;

  for (const question of entry.questions) {
    const qTokens = tokenize(question);
    if (qTokens.length === 0) continue;

    const qSet = new Set(qTokens);
    let overlap = 0;
    for (const token of querySet) {
      if (qSet.has(token)) overlap += 1;
    }

    const union = new Set([...querySet, ...qSet]).size;
    let score = overlap / union;

    // Bonus for direct substring containment either direction.
    const normalizedQuery = normalize(queryTokens.join(" "));
    const normalizedSample = normalize(question);
    if (
      normalizedSample.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedSample)
    ) {
      score += 0.3;
    }

    if (score > best) best = score;
  }

  return best;
}

/** Minimum score required before we treat a match as confident. */
export const CONFIDENCE_THRESHOLD = 0.35;

/** Find the best-matching knowledge-base entry for free-text user input. */
export function findBestMatch(query: string): MatchResult | null {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return null;

  let best: MatchResult | null = null;
  for (const entry of knowledgeBase) {
    const score = scoreEntry(queryTokens, entry);
    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  return best;
}

export function getEntryById(id: string): KBEntry | undefined {
  return knowledgeBase.find((e) => e.id === id);
}

/** Detect whether the user's message expresses intent to book a consultation. */
export function isBookingIntent(query: string): boolean {
  const tokens = new Set(tokenize(query));
  const bookingWords = [
    "book",
    "booking",
    "appointment",
    "appointments",
    "consult",
    "consultation",
    "schedule",
    "scheduling",
    "sign",
    "signup",
    "enroll",
    "register",
    "visit",
  ];
  return bookingWords.some((w) => tokens.has(w));
}
