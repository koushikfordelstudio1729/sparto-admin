export const getUserRoleClass = (role: string): string => {
  switch (role) {
    case "user":
      return "bg-blue-100 text-blue-800";
    case "premium":
      return "bg-purple-100 text-purple-800";
    case "business":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
