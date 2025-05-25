import React from "react";
import { X, Search } from "lucide-react";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-white ${className}`}
    >
      <Search size={16} className="text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-sm"
      />
      {value && (
        <button
          onClick={onClear ? onClear : () => onChange("")}
          className="text-gray-500 hover:text-red-500"
          title="Clear"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
