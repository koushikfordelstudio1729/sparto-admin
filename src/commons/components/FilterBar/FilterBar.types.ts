type FilterOption = { value: string; label: string };

interface FilterConfig {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label?: string;
}

export interface FilterBarProps {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  filters?: FilterConfig[];
  className?: string;
}
