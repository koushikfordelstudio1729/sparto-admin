import React from "react";
import type { PaymentStatusBadgeProps } from "../Orders.types";

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  paymentStatus,
}) => {
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

export default PaymentStatusBadge;
