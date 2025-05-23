import type { StatCardProps } from "../../types/index.types";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
}: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className={`${bgColor} p-3 rounded-full`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  </div>
);
