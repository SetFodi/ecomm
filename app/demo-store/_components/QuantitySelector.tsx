import { memo } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function QuantitySelectorComponent({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const handleDecrease = (): void => {
    const next = clamp(value - 1, min, max);
    onChange(next);
  };

  const handleIncrease = (): void => {
    const next = clamp(value + 1, min, max);
    onChange(next);
  };

  const isAtMin = value <= min;
  const isAtMax = value >= max;

  return (
    <div className="inline-flex items-center rounded-xl border border-cream-300 dark:border-charcoal-700 bg-cream-50 dark:bg-charcoal-900 overflow-hidden">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isAtMin}
        aria-label="რაოდენობის შემცირება"
        className="flex h-10 w-10 items-center justify-center text-charcoal-600 dark:text-charcoal-300 transition hover:bg-cream-200 dark:hover:bg-charcoal-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <HiOutlineMinus className="w-4 h-4" />
      </button>
      <span className="w-12 text-center text-sm font-semibold text-charcoal-900 dark:text-cream-50 tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={isAtMax}
        aria-label="რაოდენობის გაზრდა"
        className="flex h-10 w-10 items-center justify-center text-charcoal-600 dark:text-charcoal-300 transition hover:bg-cream-200 dark:hover:bg-charcoal-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <HiOutlinePlus className="w-4 h-4" />
      </button>
    </div>
  );
}

export const QuantitySelector = memo(QuantitySelectorComponent);
