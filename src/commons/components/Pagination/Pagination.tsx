// src/commons/components/pagination/Pagination.tsx
import React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  totalItems: number; // e.g. 125
  currentPage: number; // 1-based
  pageSize: number; // e.g. 10, 20
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[]; // default: [10, 20, 50]
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  /** Build a smart page list (1 … 4 5 6 … 10) */
  const buildPages = () => {
    const pages: (number | string)[] = [];
    const spread = 1; // how many page numbers around the current one
    const min = Math.max(1, currentPage - spread);
    const max = Math.min(totalPages, currentPage + spread);

    // always show first page
    if (min > 1) pages.push(1);
    if (min > 2) pages.push("…");

    for (let p = min; p <= max; p++) pages.push(p);

    if (max < totalPages - 1) pages.push("…");
    if (max < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = buildPages();

  const buttonClasses =
    "px-2.5 py-1.5 rounded text-sm font-medium transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {/* ───── Page size selector ───── */}
      {onPageSizeChange && (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <span>Show&nbsp;</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 bg-white"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span>&nbsp;per page</span>
        </div>
      )}

      {/* ───── Pagination controls ───── */}
      <div className="flex items-center gap-1">
        <button
          className={buttonClasses}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className={buttonClasses}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, idx) =>
          p === "…" ? (
            <span key={idx} className="px-2 text-gray-500">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`${buttonClasses} ${
                p === currentPage
                  ? "bg-indigo-600 text-white hover:bg-indigo-600"
                  : "text-gray-700"
              }`}
              onClick={() => onPageChange(p as number)}
            >
              {p}
            </button>
          )
        )}

        <button
          className={buttonClasses}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className={buttonClasses}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      {/* ───── Showing X–Y of Z ───── */}
      <div className="text-sm text-gray-600">
        Showing&nbsp;
        {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}
        &nbsp;–&nbsp;
        {Math.min(currentPage * pageSize, totalItems)}
        &nbsp;of&nbsp;{totalItems}
      </div>
    </div>
  );
};

export default Pagination;
