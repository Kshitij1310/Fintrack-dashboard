import Button from '../ui/Button';

const buildPages = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, '...', total];
  if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = buildPages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {pages.map((page, idx) =>
          page === '...'
            ? (
              <span key={`${page}-${idx}`} className="text-slate-400 dark:text-slate-500">…</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3.5 py-1.5 rounded-xl border text-sm font-semibold ${
                  page === currentPage
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-100'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-300'
                }`}
              >
                {page}
              </button>
            )
        )}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
