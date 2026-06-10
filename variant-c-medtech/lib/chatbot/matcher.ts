import { knowledgeBase } from "@/lib/chatbot/knowledge-base";
import type { KnowledgeEntry } from "@/lib/chatbot/types";

/** Common English filler words ignored during matching. */
const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "am",
  "do",
  "does",
  "did",
  "i",
  "my",
  "me",
  "you",
  "your",
  "to",
  "of",
  "for",
  "in",
  "on",
  "at",
  "and",
  "or",
  "it",
  "this",
  "that",
  "with",
  "about",
  "can",
  "could",
  "would",
  "what",
  "where",
  "when",
  "how",
  "who",
  "please",
  "hi",
  "hello",
  "hey",
  "im",
  "i'm",
]);

/** Lowercases, strips punctuation, and tokenizes into significant words. */
export function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export type MatchResult = {
  entry: KnowledgeEntry;
  score: number;
};

/**
 * Scores a knowledge base entry against a normalized set of input tokens.
 * Score = (matching tokens) weighted by where the match occurred:
 *  - exact keyword match: 2 points
 *  - keyword contains token / token contains keyword (substring): 1 point
 */
function scoreEntry(tokens: string[], entry: KnowledgeEntry): number {
  let score = 0;
  for (const token of tokens) {
    let best = 0;
    for (const keyword of entry.keywords) {
      if (keyword === token) {
        best = Math.max(best, 2);
      } else if (keyword.includes(token) || token.includes(keyword)) {
        best = Math.max(best, 1);
      }
    }
    score += best;
  }
  return score;
}

/** Minimum score (relative to token count) required to consider a match "confident". */
const CONFIDENCE_THRESHOLD = 1;

/**
 * Finds the best-matching knowledge base entry for free-text user input.
 * Returns null if no entry scores above the confidence threshold.
 */
export function findBestMatch(input: string): MatchResult | null {
  const tokens = normalize(input);
  if (tokens.length === 0) return null;

  let best: MatchResult | null = null;
  for (const entry of knowledgeBase) {
    const score = scoreEntry(tokens, entry);
    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  if (!best || best.score < CONFIDENCE_THRESHOLD) return null;
  return best;
}

/** Intent words that should trigger the guided booking flow regardless of FAQ matches. */
const BOOKING_INTENT_WORDS = [
  "book",
  "booking",
  "appointment",
  "appt",
  "consult",
  "consultation",
  "schedule",
  "scheduling",
  "sign up",
  "signup",
  "get started",
  "new patient",
];

export function hasBookingIntent(input: string): boolean {
  const lower = input.toLowerCase();
  return BOOKING_INTENT_WORDS.some((phrase) => lower.includes(phrase));
}
