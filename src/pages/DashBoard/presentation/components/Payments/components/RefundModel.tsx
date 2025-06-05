import CustomButton from "@/commons/components/Button";
import type { Payment } from "../payments.types";

interface RefundModalProps {
  payment: Payment | null;
  refundAmount: string;
  refundReason: string;
  onRefundAmountChange: (value: string) => void;
  onRefundReasonChange: (value: string) => void;
  onRefund: () => void;
  onCancel: () => void;
}

export const RefundModal: React.FC<RefundModalProps> = ({
  payment,
  refundAmount,
  refundReason,
  onRefundAmountChange,
  onRefundReasonChange,
  onRefund,
  onCancel,
}) => {
  if (!payment) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">Process Refund</h3>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Payment ID: {payment.transactionId}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Original Amount: ${payment.amount.toFixed(2)}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Amount
            </label>
            <input
              type="number"
              value={refundAmount}
              onChange={(e) => onRefundAmountChange(e.target.value)}
              max={payment.amount}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Reason
            </label>
            <textarea
              value={refundReason}
              onChange={(e) => onRefundReasonChange(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for refund..."
            />
          </div>

          <div className="flex gap-3">
            <CustomButton
              onClick={onRefund}
              variant="secondary"
              size="md"
              fullWidth
              disabled={false}
            >
              <p className="text-white"> Process Refund</p>
            </CustomButton>
            <CustomButton
              onClick={onCancel}
              variant="danger"
              size="md"
              disabled={false}
            >
              <p className="text-white">Cancel</p>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
