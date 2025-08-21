import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
};

export function Pagination({ page, totalPages, onPage }: Props) {
  if (totalPages <= 1) return null;

  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(totalPages, page + 1));

  const getVisiblePages = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <button
        onClick={prev}
        disabled={page === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-violet-200 bg-white/80 backdrop-blur-sm text-violet-600 hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPage(1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-violet-200 bg-white/80 backdrop-blur-sm text-violet-600 hover:bg-violet-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="text-violet-400 px-2">...</span>
          )}
        </>
      )}

      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${
            p === page
              ? "bg-gradient-to-br from-violet-600 to-purple-500 border-violet-600 text-white shadow-md"
              : "border-violet-200 bg-white/80 backdrop-blur-sm text-violet-600 hover:bg-violet-50"
          }`}
        >
          {p}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-violet-400 px-2">...</span>
          )}
          <button
            onClick={() => onPage(totalPages)}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-violet-200 bg-white/80 backdrop-blur-sm text-violet-600 hover:bg-violet-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={next}
        disabled={page === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-violet-200 bg-white/80 backdrop-blur-sm text-violet-600 hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
