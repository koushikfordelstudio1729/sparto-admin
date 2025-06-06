// components/QuoteDetailsModal.tsx
import React from "react";
import {
  X,
  Download,
  FileText,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import type { QuoteEntity } from "@/commons/domain/entities/QuoteEntity";

interface QuoteDetailsModalProps {
  selectedQuote: QuoteEntity | null;
  onClose: () => void;
}

const QuoteDetailsModal: React.FC<QuoteDetailsModalProps> = ({
  selectedQuote,
  onClose,
}) => {
  if (!selectedQuote) return null;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "updated":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const isExpired = new Date() > new Date(selectedQuote.validUntil);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Quote Details - {selectedQuote.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Version {selectedQuote.version} • Order{" "}
                    {selectedQuote.orderId}
                  </p>
                </div>
                <StatusBadge
                  text={
                    selectedQuote.status.charAt(0).toUpperCase() +
                    selectedQuote.status.slice(1)
                  }
                  className={getStatusClass(selectedQuote.status)}
                />
                {isExpired && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Expired
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-6 max-h-96 overflow-y-auto">
            <div className="space-y-8">
              {/* Quote Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(selectedQuote.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600">
                        Valid Until
                      </p>
                      <p className="text-lg font-semibold text-green-900">
                        {new Date(
                          selectedQuote.validUntil
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-green-600">
                        {selectedQuote.validityPeriod} days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-purple-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-600">
                        Created By
                      </p>
                      <p className="text-lg font-semibold text-purple-900 capitalize">
                        {selectedQuote.createdBy}
                      </p>
                      <p className="text-xs text-purple-600">
                        {new Date(selectedQuote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Quote Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Quote ID:</span>
                      <span className="text-sm font-medium text-gray-900 font-mono">
                        {selectedQuote.id}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Version:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedQuote.version}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Order ID:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedQuote.orderId}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(selectedQuote.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">
                        Last Updated:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(selectedQuote.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Pricing Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Subtotal:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(selectedQuote.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Total Tax:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(selectedQuote.totalTax)}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-t-2 border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">
                        Total Amount:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(selectedQuote.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedQuote.notes && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Notes
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedQuote.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Quote Items */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Quote Items ({selectedQuote.items.length})
                </h4>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Line Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedQuote.items.map((item, index) => (
                        <tr
                          key={item.id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(item.tax)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attachments */}
              {selectedQuote.attachments &&
                selectedQuote.attachments.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Attachments ({selectedQuote.attachments.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedQuote.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500 uppercase">
                                {attachment.type}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              window.open(attachment.url, "_blank")
                            }
                            className="ml-3 inline-flex items-center p-2 border border-transparent rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="Download file"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Last updated:{" "}
                {new Date(selectedQuote.updatedAt).toLocaleString()}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Print Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailsModal;
