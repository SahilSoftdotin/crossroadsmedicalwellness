import { services } from "@/lib/data/services";

export type BookingStep =
  | "name"
  | "service"
  | "contact"
  | "details"
  | "review"
  | "submitting"
  | "done";

export type BookingData = {
  name: string;
  service: string;
  email: string;
  phone: string;
  notes: string;
};

export const initialBookingData: BookingData = {
  name: "",
  service: "",
  email: "",
  phone: "",
  notes: "",
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts common US phone formats with at least 10 digits.
export const PHONE_RE = /^[\d\s().+-]{7,}$/;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return digitsOnly(value).length >= 10 && PHONE_RE.test(value.trim());
}

/** At least one of email or phone must be valid. */
export function isValidContact(email: string, phone: string): boolean {
  const e = email.trim();
  const p = phone.trim();
  if (!e && !p) return false;
  if (e && !isValidEmail(e)) return false;
  if (p && !isValidPhone(p)) return false;
  return true;
}

/** Service options for quick-reply chips, derived from the real services list. */
export const serviceOptions = [
  ...services.map((s) => s.shortName),
  "Not sure / general consultation",
];

/**
 * Build the payload for POST /api/lead.
 *
 * The mock route requires `email` to be present and pass a basic regex.
 * If the patient only provided a phone number, we synthesize a
 * clearly-labeled placeholder address (using their digits) so the request
 * validates — the real phone number is still included as its own field and
 * called out at the top of `message` for staff follow-up.
 */
export function buildLeadPayload(data: BookingData) {
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const trimmedEmail = data.email.trim();
  const trimmedPhone = data.phone.trim();
  const email =
    trimmedEmail ||
    `phone-${digitsOnly(trimmedPhone) || "0000000000"}@no-email.crossroadsmedicalwellness.com`;

  const messageParts = [
    `Consultation request via chatbot.`,
    !trimmedEmail && trimmedPhone
      ? `No email provided — please contact by phone: ${trimmedPhone}`
      : null,
    `Name: ${data.name.trim()}`,
    `Service of interest: ${data.service}`,
    trimmedPhone ? `Phone: ${trimmedPhone}` : null,
    data.notes.trim() ? `Preferred time / notes: ${data.notes.trim()}` : null,
  ].filter(Boolean);

  return {
    source: "chatbot",
    firstName,
    lastName,
    name: data.name.trim(),
    email,
    phone: trimmedPhone || undefined,
    interest: data.service,
    message: messageParts.join("\n"),
  };
}
