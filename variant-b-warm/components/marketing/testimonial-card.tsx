import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";
import { StarRating } from "@/components/marketing/star-rating";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8",
        className
      )}
    >
      <Quote
        className="h-8 w-8 text-terracotta-light"
        aria-hidden="true"
        fill="currentColor"
      />
      <StarRating rating={testimonial.rating} className="mt-4" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brown sm:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light font-display text-sm font-bold text-sage-dark">
          {testimonial.initials}
        </span>
        <div>
          <p className="text-sm font-bold text-brown">{testimonial.name}</p>
          <p className="text-xs text-brown-soft">{testimonial.location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
