"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal, useReducedMotion } from "@/components/motion/motion-primitives";
import { testimonials, aggregateRating, type Testimonial } from "@/lib/data/testimonials";

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[320px] shrink-0 flex-col gap-4 rounded-[26px] border border-white/60 bg-background/70 p-7 shadow-card backdrop-blur-xl sm:w-[380px]">
      <div className="flex items-center gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < t.rating ? "size-4 fill-accent text-accent" : "size-4 fill-transparent text-border"
            }
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-semibold text-primary">
          {t.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function ReviewsMarquee() {
  const reduce = useReducedMotion();
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="section-y overflow-hidden bg-secondary/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Patient reviews"
            title="Real results, in patients' own words"
            description={`Rated ${aggregateRating.average}/5 across ${aggregateRating.count}+ reviews from patients across Athens and Limestone County.`}
            align="center"
            className="mx-auto"
          />
        </Reveal>
      </div>

      <div
        className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-label="Patient testimonials"
      >
        {reduce ? (
          <div className="container-page flex gap-5 overflow-x-auto pb-4">
            {testimonials.map((t) => (
              <ReviewCard key={t.id} t={t} />
            ))}
          </div>
        ) : (
          <div className="group flex w-max gap-5 pl-5 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <ReviewCard key={`${t.id}-${i}`} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
