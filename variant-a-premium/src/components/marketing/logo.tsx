import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const textColor = variant === "light" ? "text-[var(--primary-foreground)]" : "text-[var(--foreground)]";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Crossroads Medical Wellness — home"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] transition-transform group-hover:scale-105"
      >
        {/* Crossroads mark */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2v20M2 12h20" stroke="var(--brass-500)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.4" stroke="var(--primary-foreground)" strokeWidth="1.6" />
        </svg>
      </span>
      <span className={cn("flex flex-col leading-none", textColor)}>
        <span className="font-display text-[1.05rem] font-semibold tracking-tight">
          Crossroads
        </span>
        <span
          className={cn(
            "text-[0.62rem] font-medium uppercase tracking-[0.16em]",
            variant === "light" ? "text-[var(--brass-400)]" : "text-[var(--brass-700)]",
          )}
        >
          Medical Wellness
        </span>
      </span>
    </Link>
  );
}
