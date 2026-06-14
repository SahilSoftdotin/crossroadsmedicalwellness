"use client";

import { useReducedMotion } from "framer-motion";
import { TestimonialsColumn, ReviewCard } from "@/components/ui/testimonials-columns";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";

function rotate(arr: Testimonial[], n: number): Testimonial[] {
  const k = arr.length ? n % arr.length : 0;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

export function ReviewsWall() {
  const reduce = useReducedMotion();

  // Reduced motion: a plain, fully-readable static grid (no auto-scroll).
  if (reduce) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <ReviewCard key={t.id} t={t} />
        ))}
      </div>
    );
  }

  // Offset each column so the same review isn't shown side-by-side.
  const col1 = testimonials;
  const col2 = rotate(testimonials, 2);
  const col3 = rotate(testimonials, 4);

  return (
    <div className="flex max-h-[42rem] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
      <TestimonialsColumn testimonials={col1} duration={20} />
      <TestimonialsColumn testimonials={col2} duration={26} className="hidden md:block" />
      <TestimonialsColumn testimonials={col3} duration={23} className="hidden lg:block" />
    </div>
  );
}
