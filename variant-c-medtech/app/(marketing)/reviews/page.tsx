import type { Metadata } from "next";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { testimonials, aggregateRating } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read what patients are saying about their experience with Dr. Gary Adams and the team at Crossroads Medical Wellness.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <SectionHeading
            eyebrow="Patient reviews"
            title="What patients say about their care"
            description="Real stories from patients across our hormone health, weight loss, and longevity programs."
            align="center"
            className="mx-auto"
          />
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-6 fill-accent text-accent" aria-hidden="true" />
              ))}
            </div>
            <p className="font-display text-3xl font-semibold text-primary">
              {aggregateRating.average} / 5
            </p>
            <p className="text-sm text-muted-foreground">Based on {aggregateRating.count}+ patient reviews</p>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
