import React from "react";
import type { StatCardProps } from "./StatCard.types";
import { variantConfig } from "./StateCardVariant";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = "default",
  trend,
  loading = false,
  onClick,
  className = "",
}) => {
  const config = variantConfig[variant];

  const displayValue =
    typeof value === "number" ? value.toLocaleString() : value;

  const cardClasses = `
    ${config.bgColor} 
    ${config.border}
    border
    rounded-lg 
    p-4 
    transition-all 
    duration-200 
    hover:shadow-md 
    ${onClick ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : ""}
    ${className}
  `.trim();

  const handleClick = () => {
    if (onClick && !loading) {
      onClick();
    }
  };

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            {Icon && <div className="h-8 w-8 bg-gray-300 rounded-full"></div>}
          </div>
          <div className="h-8 bg-gray-300 rounded w-16 mb-1"></div>
          {trend && <div className="h-3 bg-gray-300 rounded w-12"></div>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.textColor} mb-1`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${config.valueColor} leading-none`}>
            {displayValue}
          </p>

          {trend && (
            <div className="flex items-center mt-2 space-x-1">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
              </span>
              {trend.period && (
                <span className="text-xs text-gray-500">{trend.period}</span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div className={`${config.iconBg} p-2 rounded-lg ml-3 flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
};
