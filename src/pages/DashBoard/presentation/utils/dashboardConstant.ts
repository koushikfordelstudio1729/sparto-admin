export const DASHBOARD_STATS = [
  {
    title: "Total Users",
    value: 12543,
    variant: "blue" as const,
    trend: { value: 12.5, isPositive: true, period: "vs last month" },
  },
  {
    title: "Active Users",
    value: 8921,
    variant: "green" as const,
    trend: { value: 8.2, isPositive: true, period: "vs last month" },
  },
  {
    title: "Premium Users",
    value: 1234,
    variant: "purple" as const,
    trend: { value: 15.3, isPositive: true, period: "vs last month" },
  },
  {
    title: "Total Revenue",
    value: "$45,210",
    variant: "orange" as const,
    trend: { value: 3.2, isPositive: false, period: "vs last month" },
  },
];
