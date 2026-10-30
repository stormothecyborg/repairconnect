import { Card } from "@/components/ui/Card";
import { RatingStars } from "@/components/ui/RatingStars";
import type { Technician } from "@/types";

export function ReviewList({ reviews }: { reviews: Technician["reviews"] }) {
  if (reviews.length === 0) {
    return <Card className="p-5"><p className="text-sm text-muted">No reviews yet.</p></Card>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div><p className="text-sm font-semibold text-heading">{review.shopName}</p><p className="mt-0.5 text-xs text-muted">{new Date(`${review.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p></div>
            <RatingStars rating={review.rating} />
          </div>
          <p className="mt-3 text-sm leading-6 text-body">{review.comment}</p>
        </Card>
      ))}
    </div>
  );
}