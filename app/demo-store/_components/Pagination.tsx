interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="გვერდების ნავიგაცია"
      className="mt-6 flex items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300"
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium shadow-sm transition hover:border-primary-400 hover:text-primary-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary-400 dark:hover:text-primary-200 dark:disabled:border-slate-800 dark:disabled:text-slate-500"
      >
        წინა
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                isActive
                  ? "bg-primary-600 text-white shadow-sm dark:bg-primary-500"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium shadow-sm transition hover:border-primary-400 hover:text-primary-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary-400 dark:hover:text-primary-200 dark:disabled:border-slate-800 dark:disabled:text-slate-500"
      >
        შემდეგი
      </button>
    </nav>
  );
}


