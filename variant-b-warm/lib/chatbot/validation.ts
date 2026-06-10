// Lightweight validation helpers for the chatbot's guided booking flow.
// Intentionally simple/deterministic — no external libraries.

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Reasonable, simple email check (not RFC-exhaustive on purpose).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  // Accept 10-digit US numbers, optionally with leading country code (11).
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").replace(/^1/, "");
  if (digits.length !== 10) return value.trim();
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** True if the value looks like a usable email OR phone number. */
export function isValidContact(value: string): boolean {
  return isValidEmail(value) || isValidPhone(value);
}
