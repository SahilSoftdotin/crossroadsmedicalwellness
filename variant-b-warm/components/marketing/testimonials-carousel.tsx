"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const perPage = 3;
  const pageCount = Math.ceil(testimonials.length / perPage);
  const page = index % pageCount;
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);
  // Pad if last page has fewer items
  const padded =
    visible.length < perPage
      ? [...visible, ...testimonials.slice(0, perPage - visible.length)]
      : visible;

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {padded.map((t, i) => (
          <TestimonialCard
            key={`${t.id}-${i}`}
            testimonial={t}
            className="animate-fade-up"
          />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setIndex((p) => (p - 1 + pageCount) % pageCount)}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === page}
                aria-label={`Show testimonials page ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === page ? "w-6 bg-terracotta" : "bg-clay"
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setIndex((p) => (p + 1) % pageCount)}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
