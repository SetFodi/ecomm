"use client";

import { HiOutlineChevronDown } from "react-icons/hi2";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "popular";

const OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "popular", label: "პოპულარული" },
  { value: "rating", label: "რეიტინგი" },
  { value: "price-asc", label: "ფასი ↑" },
  { value: "price-desc", label: "ფასი ↓" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const selectedLabel = OPTIONS.find((opt) => opt.value === value)?.label ?? "დალაგება";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="appearance-none w-full pl-4 pr-10 py-2.5 text-sm font-medium text-charcoal-700 dark:text-charcoal-200 bg-cream-100 dark:bg-charcoal-800 rounded-xl border-0 outline-none cursor-pointer hover:bg-cream-200 dark:hover:bg-charcoal-700 focus:ring-2 focus:ring-charcoal-300 dark:focus:ring-charcoal-600 transition-colors"
        aria-label="დალაგება"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500 dark:text-charcoal-400 pointer-events-none" />
    </div>
  );
}
