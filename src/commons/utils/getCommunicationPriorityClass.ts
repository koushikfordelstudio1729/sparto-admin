export const getCommunicationPriorityClass = (priority: string): string => {
  switch (priority) {
    case "low":
      return "bg-gray-100 text-gray-800";
    case "medium":
      return "bg-blue-100 text-blue-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
