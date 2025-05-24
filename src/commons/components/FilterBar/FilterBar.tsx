import React from "react";
import SearchBar from "@/commons/components/SearchBar/SearchBar";
import type { FilterBarProps } from "./FilterBar.types";

const FilterBar: React.FC<FilterBarProps> = ({
  search,
  filters = [],
  className = "",
}) => {
  const hasSearch = !!search;
  const hasFilters = filters.length > 0;

  // Determine container alignment
  const containerClasses =
    hasSearch && hasFilters
      ? "justify-between"
      : hasSearch
        ? "justify-start"
        : "justify-end";

  return (
    <div
      className={`flex flex-wrap items-center ${containerClasses} gap-6 mb-6 ${className}`}
    >
      {/* Search */}
      {hasSearch && (
        <div className={hasFilters ? "flex-grow" : "w-[500px]"}>
          <SearchBar
            value={search.value}
            onChange={search.onChange}
            placeholder={search.placeholder || "Search..."}
            className="w-full"
            onClear={() => search.onChange("")}
          />
        </div>
      )}

      {/* Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-4">
          {filters.map((filter, idx) => (
            <select
              key={idx}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
