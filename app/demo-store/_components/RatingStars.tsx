import { memo } from "react";
import { HiStar } from "react-icons/hi2";

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  size?: "sm" | "md";
}

const MAX_STARS = 5;

function RatingStarsComponent({ rating, reviewsCount, size = "md" }: RatingStarsProps) {
  const clampedRating = Math.min(Math.max(rating, 0), MAX_STARS);
  const starClassName = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1.5" aria-label={`რეიტინგი ${clampedRating} / 5`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: MAX_STARS }).map((_, index) => {
          const isFilled = index < Math.floor(clampedRating);
          const isHalf = !isFilled && index < clampedRating;
          
          return (
            <span key={index} className="relative" aria-hidden="true">
              <HiStar 
                className={`${starClassName} ${
                  isFilled || isHalf 
                    ? "text-gold-400" 
                    : "text-cream-300 dark:text-charcoal-700"
                }`}
                style={isHalf ? { 
                  clipPath: `polygon(0 0, ${(clampedRating - index) * 100}% 0, ${(clampedRating - index) * 100}% 100%, 0 100%)`
                } : undefined}
              />
              {isHalf && (
                <HiStar 
                  className={`${starClassName} absolute inset-0 text-cream-300 dark:text-charcoal-700`}
                  style={{ clipPath: `polygon(${(clampedRating - index) * 100}% 0, 100% 0, 100% 100%, ${(clampedRating - index) * 100}% 100%)` }}
                />
              )}
            </span>
          );
        })}
      </div>
      <span className={`text-charcoal-500 dark:text-charcoal-400 ${size === "sm" ? "text-[11px]" : "text-xs"}`}>
        {clampedRating.toFixed(1)}
        {reviewsCount !== undefined && (
          <span className="text-charcoal-400 dark:text-charcoal-500"> ({reviewsCount})</span>
        )}
      </span>
    </div>
  );
}

export const RatingStars = memo(RatingStarsComponent);
