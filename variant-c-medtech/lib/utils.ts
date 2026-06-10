import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", options ?? {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Returns 0-100 progress toward a goal given the current and target values.
 * For "increase" goals, progress is current/target. For "decrease" goals,
 * progress is target/current (closer to target = closer to 100%).
 */
export function goalProgressPercent(
  current: number,
  target: number,
  direction: "increase" | "decrease"
): number {
  if (current <= 0 || target <= 0) return 0;
  const pct = direction === "increase" ? (current / target) * 100 : (target / current) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}
