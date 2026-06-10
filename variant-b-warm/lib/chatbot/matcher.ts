import { knowledgeBase, type KbEntry } from "@/lib/chatbot/knowledge-base";

// A small list of low-value words that shouldn't drive matching on their
// own. Keeping this short and predictable (no external NLP libraries).
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
  "my",
  "me",
  "to",
  "for",
  "of",
  "in",
  "on",
  "at",
  "and",
  "or",
  "what",
  "how",
  "can",
  "could",
  "would",
  "will",
  "with",
  "about",
  "have",
  "has",
  "it",
  "this",
  "that",
  "be",
  "im",
  "i'm",
  "please",
  "hi",
  "hello",
  "hey",
]);

/** Lowercase, strip punctuation, collapse whitespace. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tokenize normalized text into meaningful (non-stopword) tokens. */
export function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((tok) => tok.length > 1 && !STOP_WORDS.has(tok));
}

export type MatchResult = {
  entry: KbEntry;
  score: number;
};

/**
 * Score a knowledge-base entry against a set of user tokens using simple
 * token-overlap with a keyword bonus. Returns a 0..1-ish score (can exceed
 * 1 slightly with keyword bonuses, callers should treat >= ~0.35 as a
 * confident match).
 */
function scoreEntry(userTokens: Set<string>, entry: KbEntry): number {
  if (userTokens.size === 0) return 0;

  let best = 0;
  for (const question of entry.questions) {
    const qTokens = tokenize(question);
    if (qTokens.length === 0) continue;
    const qSet = new Set(qTokens);
    let overlap = 0;
    for (const tok of qSet) {
      if (userTokens.has(tok)) overlap++;
    }
    // Score relative to the size of the *question's* token set so short,
    // specific phrasings aren't penalized for the user typing more words.
    const score = overlap / qSet.size;
    if (score > best) best = score;
  }

  // Keyword bonus: each matched keyword adds a fixed boost.
  if (entry.keywords) {
    let keywordHits = 0;
    for (const kw of entry.keywords) {
      const kwTokens = tokenize(kw);
      if (kwTokens.every((t) => userTokens.has(t))) {
        keywordHits++;
      }
    }
    if (keywordHits > 0) {
      best += Math.min(0.15 * keywordHits, 0.45);
    }
  }

  return best;
}

/** Minimum score required to consider a match "confident". */
export const MATCH_THRESHOLD = 0.4;

/**
 * Find the best knowledge-base match for a user message. Returns null if
 * the input has no meaningful tokens at all.
 */
export function findBestMatch(userText: string): MatchResult | null {
  const tokens = tokenize(userText);
  if (tokens.length === 0) return null;

  const userTokens = new Set(tokens);

  let best: MatchResult | null = null;
  for (const entry of knowledgeBase) {
    const score = scoreEntry(userTokens, entry);
    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  return best;
}

// --- Intent detection (separate from FAQ matching) -------------------------

const BOOKING_WORDS = [
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
  "enroll",
];

/** Detect whether the user's message expresses intent to book/schedule. */
export function isBookingIntent(userText: string): boolean {
  const normalized = normalize(userText);
  return BOOKING_WORDS.some((phrase) => normalized.includes(phrase));
}
