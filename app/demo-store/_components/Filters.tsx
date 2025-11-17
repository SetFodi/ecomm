"use client";

import type { ProductCategory } from "@/types/store";

export interface FiltersState {
  category: ProductCategory | "ყველა";
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
}

interface FiltersProps {
  value: FiltersState;
  onChange: (value: FiltersState) => void;
  priceBounds: {
    min: number;
    max: number;
  };
}

const CATEGORY_LABELS: Array<{ value: ProductCategory | "ყველა"; label: string }> = [
  { value: "ყველა", label: "ყველა" },
  { value: "ავეჯი", label: "ავეჯი" },
  { value: "ელექტრონიკა", label: "ელექტრონიკა" },
  { value: "დისაინი", label: "დისაინი" },
  { value: "აქსესუარები", label: "აქსესუარები" },
];

export function Filters({
  value,
  onChange,
  priceBounds,
}: FiltersProps): JSX.Element {
  const handleCategoryChange = (category: ProductCategory | "ყველა"): void => {
    onChange({
      ...value,
      category,
    });
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = Number(event.target.value);
    onChange({
      ...value,
      minPrice: Math.min(next, value.maxPrice),
    });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = Number(event.target.value);
    onChange({
      ...value,
      maxPrice: Math.max(next, value.minPrice),
    });
  };

  const handleInStockToggle = (): void => {
    onChange({
      ...value,
      inStockOnly: !value.inStockOnly,
    });
  };

  return (
    <aside aria-label="ფილტრები" className="space-y-6">
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          კატეგორია
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_LABELS.map((category) => {
            const isActive = value.category === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm dark:border-primary-400 dark:bg-primary-500/10 dark:text-primary-200"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-primary-400 dark:hover:text-primary-200"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          ფასის დიაპაზონი
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[11px] text-slate-500 dark:text-slate-400">
                მინ.
              </label>
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={value.minPrice}
                onChange={handleMinPriceChange}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[11px] text-slate-500 dark:text-slate-400">
                მაქს.
              </label>
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={value.maxPrice}
                onChange={handleMaxPriceChange}
                className="w-full"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {Math.round(value.minPrice)} ₾ – {Math.round(value.maxPrice)} ₾
          </p>
        </div>
      </section>

      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={value.inStockOnly}
            onClick={handleInStockToggle}
            className={`flex h-5 w-9 items-center rounded-full border transition ${
              value.inStockOnly
                ? "border-primary-500 bg-primary-500"
                : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-700"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow-sm transition ${
                value.inStockOnly ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            მხოლოდ მარაგში
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              category: "ყველა",
              minPrice: priceBounds.min,
              maxPrice: priceBounds.max,
              inStockOnly: false,
            })
          }
          className="text-xs font-medium text-slate-500 underline-offset-2 hover:underline dark:text-slate-400"
        >
          გასუფთავება
        </button>
      </section>
    </aside>
  );
}


