"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import type { Testimonial } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const perView = 3;
  const maxIndex = Math.max(0, testimonials.length - perView);
  const [index, setIndex] = useState(0);

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(calc(-${index} * (100% / ${perView} + 1.5rem / ${perView})))` }}
        >
          {testimonials.map((t) => (
            <div key={t.id} className="w-full shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={!canPrev}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors",
            canPrev ? "hover:bg-muted" : "opacity-40"
          )}
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-1.5" role="presentation">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          disabled={!canNext}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors",
            canNext ? "hover:bg-muted" : "opacity-40"
          )}
          aria-label="Next testimonials"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
