import type { LucideIcon } from "lucide-react";

export interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  title?: string;
  className?: string;
  size?: number;
}
