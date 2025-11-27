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
  { value: "დისაინი", label: "დიზაინი" },
  { value: "აქსესუარები", label: "აქსესუარები" },
];

export function Filters({ value, onChange, priceBounds }: FiltersProps) {
  const handleCategoryChange = (category: ProductCategory | "ყველა"): void => {
    onChange({ ...value, category });
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = Number(event.target.value);
    onChange({ ...value, minPrice: Math.min(next, value.maxPrice) });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = Number(event.target.value);
    onChange({ ...value, maxPrice: Math.max(next, value.minPrice) });
  };

  const handleInStockToggle = (): void => {
    onChange({ ...value, inStockOnly: !value.inStockOnly });
  };

  return (
    <aside aria-label="ფილტრები" className="space-y-6">
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
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
                className={`inline-flex items-center px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                  isActive
                    ? "bg-charcoal-900 dark:bg-cream-100 text-cream-50 dark:text-charcoal-900 shadow-md"
                    : "bg-cream-200/50 dark:bg-charcoal-800/50 text-charcoal-600 dark:text-charcoal-300 hover:bg-cream-300/50 dark:hover:bg-charcoal-700/50"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
          ფასის დიაპაზონი
        </h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-charcoal-500 dark:text-charcoal-400">მინიმალური</label>
                <span className="text-xs font-medium text-charcoal-700 dark:text-cream-200">{Math.round(value.minPrice)} ₾</span>
              </div>
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={value.minPrice}
                onChange={handleMinPriceChange}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-charcoal-500 dark:text-charcoal-400">მაქსიმალური</label>
                <span className="text-xs font-medium text-charcoal-700 dark:text-cream-200">{Math.round(value.maxPrice)} ₾</span>
              </div>
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
          <div className="px-4 py-3 bg-cream-200/30 dark:bg-charcoal-800/30 rounded-xl">
            <p className="text-sm font-medium text-charcoal-900 dark:text-cream-50 text-center">
              {Math.round(value.minPrice)} ₾ – {Math.round(value.maxPrice)} ₾
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-pressed={value.inStockOnly}
              onClick={handleInStockToggle}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                value.inStockOnly
                  ? "bg-sage-500"
                  : "bg-cream-300 dark:bg-charcoal-700"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  value.inStockOnly ? "left-6" : "left-1"
                }`}
              />
            </button>
            <span className="text-sm text-charcoal-700 dark:text-charcoal-200">
              მხოლოდ მარაგში
            </span>
          </div>
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
          className="w-full px-4 py-2.5 text-xs font-medium text-charcoal-600 dark:text-charcoal-300 border border-cream-300 dark:border-charcoal-700 rounded-xl hover:bg-cream-200/50 dark:hover:bg-charcoal-800/50 transition-colors"
        >
          ფილტრების გასუფთავება
        </button>
      </section>
    </aside>
  );
}
