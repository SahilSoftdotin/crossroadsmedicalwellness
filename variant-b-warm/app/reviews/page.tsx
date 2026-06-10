import type { Metadata } from "next";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { StarRating } from "@/components/marketing/star-rating";
import { CtaSection } from "@/components/marketing/cta-section";
import { testimonials, aggregateRating } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what patients are saying about their experience at Crossroads Medical Wellness in Athens, AL.",
};

export default function ReviewsPage() {
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: testimonials.filter((t) => t.rating === star).length,
  }));

  return (
    <>
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Patient Reviews"
            title="What our patients are saying"
            align="center"
            className="mx-auto"
          />

          {/* Aggregate rating */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft sm:grid-cols-2 sm:p-10">
            <div className="flex flex-col items-center justify-center text-center sm:border-r sm:border-border sm:pr-8">
              <p className="font-display text-6xl font-extrabold text-terracotta">
                {aggregateRating.value}
              </p>
              <StarRating rating={aggregateRating.value} className="mt-2" />
              <p className="mt-2 text-sm font-semibold text-brown-soft">
                Based on {aggregateRating.count}+ reviews
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              {ratingCounts.map(({ star, count }) => {
                const pct = (count / testimonials.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="flex w-10 items-center gap-1 font-semibold text-brown">
                      {star}
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-terracotta"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs text-brown-soft">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
