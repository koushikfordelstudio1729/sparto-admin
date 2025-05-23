import { AlertCircle, CheckCircle, Clock, Package, Truck } from "lucide-react";

export const getStatusBadge = (
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-orange-100 text-orange-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}
    >
      {getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="text-yellow-500" size={16} />;
    case "confirmed":
      return <CheckCircle className="text-blue-500" size={16} />;
    case "processing":
      return <Package className="text-orange-500" size={16} />;
    case "shipped":
      return <Truck className="text-purple-500" size={16} />;
    case "delivered":
      return <CheckCircle className="text-green-500" size={16} />;
    case "cancelled":
      return <AlertCircle className="text-red-500" size={16} />;
    default:
      return null;
  }
};

export const getPaymentBadge = (
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${colors[paymentStatus]}`}
    >
      {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
    </span>
  );
};
