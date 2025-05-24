import React from "react";
import type { StatusBadgeProps } from "./StatusBadge.types";

const StatusBadge: React.FC<StatusBadgeProps> = ({ text, className = "" }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
