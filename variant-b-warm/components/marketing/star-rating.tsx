import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  className,
  starClassName,
}: {
  rating: number;
  className?: string;
  starClassName?: string;
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {stars.map((s) => (
        <Star
          key={s}
          className={cn(
            "h-4 w-4",
            s <= Math.round(rating)
              ? "fill-gold text-gold"
              : "fill-muted text-muted",
            starClassName
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
