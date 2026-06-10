import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  bleading?: boolean;
};

/** Vertical-rhythm section wrapper. Consistent section spacing scale. */
export function Section({
  className,
  as: Comp = "section",
  ...props
}: SectionProps) {
  return (
    <Comp className={cn("py-16 md:py-24 lg:py-28", className)} {...props} />
  );
}

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-page", className)} {...props} />;
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.1] text-[var(--foreground)]">
        {title}
      </h2>
      {description ? (
        <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
