import React from "react";
import { DASHBOARD_STATS } from "../../../utils/dashboardConstant";
import { StatCard } from "../../../../../../commons/components/StatCard/StatCard";

const DashboardContent: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {DASHBOARD_STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  </div>
);

export default DashboardContent;
