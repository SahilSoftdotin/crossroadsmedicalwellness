import { services } from "@/lib/data/services";

/** Steps in the guided consultation booking flow. */
export type BookingStep =
  | "name"
  | "service"
  | "contact"
  | "contact-phone"
  | "contact-email"
  | "details"
  | "review"
  | "submitting"
  | "done";

export type BookingData = {
  name: string;
  serviceInterest: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "text" | "email";
  notes: string;
};

export const initialBookingData: BookingData = {
  name: "",
  serviceInterest: "",
  email: "",
  phone: "",
  preferredContact: "phone",
  notes: "",
};

export const bookingServiceOptions = [
  ...services.map((s) => s.shortName),
  "Not sure / general consultation",
];

/** Basic email format check. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Basic phone check: at least 7 digits, allowing common separators. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7;
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}
