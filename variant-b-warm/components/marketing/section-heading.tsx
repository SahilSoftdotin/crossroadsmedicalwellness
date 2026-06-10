import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center rounded-full bg-clay px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-terracotta-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brown sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-base leading-relaxed text-brown-soft sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
