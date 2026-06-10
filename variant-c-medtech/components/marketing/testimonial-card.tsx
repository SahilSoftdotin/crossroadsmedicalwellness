import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full rounded-2xl border-0 shadow-card ring-1 ring-border">
      <CardContent className="flex h-full flex-col gap-4 px-6 py-2">
        <div className="flex items-center gap-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < testimonial.rating
                  ? "size-4 fill-accent text-accent"
                  : "size-4 fill-transparent text-border"
              }
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <Avatar className="size-10 bg-primary-soft">
            <AvatarFallback className="bg-primary-soft font-display text-sm font-semibold text-primary">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
