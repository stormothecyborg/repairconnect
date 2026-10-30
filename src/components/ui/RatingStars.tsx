import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  showValue?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function RatingStars({ rating, showValue = false, size = "sm", className }: RatingStarsProps) {
  const safeRating = Math.max(0, Math.min(5, rating));
  const iconSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${safeRating.toFixed(1)} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(iconSize, index < Math.round(safeRating) ? "fill-accent text-accent" : "text-slate-300")}
            aria-hidden="true"
          />
        ))}
      </span>
      {showValue && <span className="text-sm font-medium text-heading">{safeRating.toFixed(1)}</span>}
    </span>
  );
}