import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value?: string | number;
  icon?: LucideIcon;
  variant?:
    | "default"
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red"
    | "yellow";
  trend?: {
    value: number;
    isPositive: boolean;
    period?: string;
  };
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}
