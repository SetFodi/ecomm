import { memo } from "react";

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
}: QuantitySelectorProps): JSX.Element {
  const handleDecrease = (): void => {
    const next = clamp(value - 1, min, max);
    onChange(next);
  };

  const handleIncrease = (): void => {
    const next = clamp(value + 1, min, max);
    onChange(next);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={handleDecrease}
        aria-label="რაოდენობის შემცირება"
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        -
      </button>
      <span className="mx-3 min-w-[1.5rem] text-center text-sm font-medium text-slate-900 dark:text-slate-100">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        aria-label="რაოდენობის გაზრდა"
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        +
      </button>
    </div>
  );
}

export const QuantitySelector = memo(QuantitySelectorComponent);


