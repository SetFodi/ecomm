import { memo } from "react";

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  size?: "sm" | "md";
}

const MAX_STARS = 5;

function getStarFill(index: number, rating: number): number {
  const starNumber = index + 1;
  if (rating >= starNumber) return 100;
  if (rating + 1 <= starNumber) return 0;
  return Math.round((rating - index) * 100);
}

function RatingStarsComponent({
  rating,
  reviewsCount,
  size = "md",
}: RatingStarsProps) {
  const clampedRating = Math.min(Math.max(rating, 0), MAX_STARS);
  const starClassName =
    size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex items-center gap-1" aria-label={`რეიტინგი ${clampedRating} / 5`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: MAX_STARS }).map((_, index) => {
          const fill = getStarFill(index, clampedRating);

          return (
            <span
              key={index}
              className="relative inline-flex"
              aria-hidden="true"
            >
              <span
                className={`${starClassName} rounded-full bg-slate-200 dark:bg-slate-700`}
              />
              {fill > 0 ? (
                <span
                  className={`${starClassName} absolute inset-0 overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-accent-400`}
                  style={{ width: `${fill}%` }}
                />
              ) : null}
            </span>
          );
        })}
      </div>
      <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
        {clampedRating.toFixed(1)}{" "}
        {reviewsCount ? `(${reviewsCount})` : null}
      </span>
    </div>
  );
}

export const RatingStars = memo(RatingStarsComponent);


