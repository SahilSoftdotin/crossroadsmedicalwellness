"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

export function ReviewCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure
      className={
        "flex w-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card sm:p-8 " +
        (className ?? "")
      }
    >
      <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, s) => (
          <Star key={s} className="size-4 fill-accent text-accent" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-primary">
          {t.initials}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-primary">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * A vertically auto-scrolling column of testimonial cards (seamless loop via a
 * duplicated set + translateY -50%). Transform-only, so it's GPU-cheap. The
 * loop is disabled under prefers-reduced-motion.
 */
export function TestimonialsColumn({
  className,
  testimonials,
  duration = 18,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <motion.div
        animate={reduce ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex w-[19rem] flex-col gap-6 pb-6"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {testimonials.map((t, i) => (
              <ReviewCard key={`${dup}-${t.id}-${i}`} t={t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
