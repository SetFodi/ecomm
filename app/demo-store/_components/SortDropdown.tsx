"use client";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "popular";

const OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "price-asc", label: "ფასი (ზრდადი)" },
  { value: "price-desc", label: "ფასი (კლებადი)" },
  { value: "rating", label: "რეიტინგი" },
  { value: "popular", label: "პოპულარული" },
];

export function SortDropdown({
  value,
  onChange,
}: SortDropdownProps): JSX.Element {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span>დალაგება:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm outline-none transition hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
        aria-label="დალაგების ცვლილება"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}


