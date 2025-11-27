import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrevious = (): void => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getVisiblePages = () => {
    const pages: (number | "...")[] = [];
    const delta = 1;
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <nav
      aria-label="გვერდების ნავიგაცია"
      className="flex items-center justify-center gap-2 py-8"
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-charcoal-600 dark:text-charcoal-300 bg-cream-100 dark:bg-charcoal-800 rounded-xl hover:bg-cream-200 dark:hover:bg-charcoal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <HiOutlineChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">წინა</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="w-10 text-center text-charcoal-400 dark:text-charcoal-500">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-charcoal-900 dark:bg-cream-100 text-cream-50 dark:text-charcoal-900 shadow-md"
                  : "text-charcoal-600 dark:text-charcoal-300 hover:bg-cream-200 dark:hover:bg-charcoal-800"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-charcoal-600 dark:text-charcoal-300 bg-cream-100 dark:bg-charcoal-800 rounded-xl hover:bg-cream-200 dark:hover:bg-charcoal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">შემდეგი</span>
        <HiOutlineChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
