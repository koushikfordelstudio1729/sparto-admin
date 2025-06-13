
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { StatCard } from "../../../../../../commons/components/StatCard/StatCard";

const DashboardContent: React.FC = () => {
  const totalUsers = useSelector(
    (state: RootState) => state.dashBoardPageSlice.totalUsers
  );
  const activeUsers = useSelector(
    (state: RootState) => state.dashBoardPageSlice.activeUsers
  );
  const inactiveUsers = useSelector(
    (state: RootState) => state.dashBoardPageSlice.inactiveUsers
  );
  const deletedUsers = useSelector(
    (state: RootState) => state.dashBoardPageSlice.deletedUsers
  );

  const stats = [
    {
      title: "Total Users" as const,
      value: totalUsers,
      icon: undefined,
      variant: "blue" as const,
    },
    {
      title: "Active Users" as const,
      value: activeUsers,
      icon: undefined,
      variant: "green" as const,
    },
    {
      title: "Inactive Users" as const,
      value: inactiveUsers,
      icon: undefined,
      variant: "orange" as const,
    },
    {
      title: "Deleted Users" as const,
      value: deletedUsers,
      icon: undefined,
      variant: "red" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
