import { Star } from "lucide-react";
import { clinic } from "@/lib/data/clinic";
import { aggregateRating } from "@/lib/data/testimonials";

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:gap-8 sm:py-12">
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" />
            ))}
          </div>
          <p className="font-display text-2xl font-semibold text-primary">{aggregateRating.average}/5</p>
          <p className="text-xs text-muted-foreground">{aggregateRating.count}+ patient reviews</p>
        </div>
        {clinic.stats.slice(0, 3).map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <p className="font-display text-2xl font-semibold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
