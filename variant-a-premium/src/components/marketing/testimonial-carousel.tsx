"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Stars } from "@/components/ui/stars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/lib/data/testimonials";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const t = testimonials[index];

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-md)] md:p-12">
        <Quote
          className="absolute right-8 top-8 size-12 text-[var(--brass-200)]"
          aria-hidden="true"
        />
        <Stars rating={t.rating} size={18} />
        <blockquote className="mt-6">
          <p className="font-display text-xl leading-relaxed text-[var(--foreground)] md:text-2xl">
            &ldquo;{t.quote}&rdquo;
          </p>
        </blockquote>
        <div className="mt-8 flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{t.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-[var(--foreground)]">{t.name}</p>
            <p className="text-sm text-[var(--muted-foreground)]">
              {t.service} · {t.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="grid size-11 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "h-2 w-7 rounded-full bg-[var(--primary)] transition-all"
                  : "h-2 w-2 rounded-full bg-[var(--cream-300)] transition-all hover:bg-[var(--brass-400)]"
              }
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="grid size-11 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
