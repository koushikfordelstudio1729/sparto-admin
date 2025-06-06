import React from "react";
// import type { Payment } from "../payments.types";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import CustomButton from "@/commons/components/Button";

interface PaymentDetailsModalProps {
  payment: PaymentEntity;
  onClose: () => void;
}

export const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({
  payment,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Payment Details - {payment._id}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Customer Information</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {payment.userName}
                </p>
                <p>
                  <strong>Email:</strong> koushik@example.com
                </p>
                <p>
                  <strong>User ID:</strong> {payment.userId}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Payment Information</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Payment Date:</strong>{" "}
                  <span className="text-sm text-gray-900">
                    {new Date(payment.date ?? 0).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </p>

                <p>
                  <strong>Amount:</strong> ${payment.amount.toFixed(2)}{" "}
                  {payment.currency}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {payment.transactionId}
                </p>
                <p>
                  <strong>Gateway:</strong> {payment.gateway}
                </p>
                <p>{/* <strong>Fees:</strong> ${payment.fees.toFixed(2)} */}</p>
              </div>
            </div>
          </div>

          {payment.notes && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Notes</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                {payment.notes}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <CustomButton
              onClick={onClose}
              variant="danger"
              size="md"
              disabled={false}
            >
              <p className="text-white">Close</p>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
