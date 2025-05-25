export const getCommunicationStatusClass = (status: string): string => {
  switch (status) {
    case "sent":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "read":
      return "bg-purple-100 text-purple-800";
    case "replied":
      return "bg-gray-100 text-gray-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
