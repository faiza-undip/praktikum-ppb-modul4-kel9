export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <span className="text-sm text-gray-600">
        Halaman {page} dari {totalPages} • {total} item
      </span>
      <div className="flex gap-2">
        <button
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
          className={`px-3 py-2 rounded-lg border ${canPrev ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"}`}
        >
          ‹ Prev
        </button>
        <button
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
          className={`px-3 py-2 rounded-lg border ${canNext ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"}`}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
