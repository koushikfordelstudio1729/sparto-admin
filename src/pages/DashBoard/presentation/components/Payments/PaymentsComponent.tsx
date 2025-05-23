import React, { useState, useEffect } from "react";
import { Search, DollarSign, CreditCard, Download } from "lucide-react";
import type { Dispute, Payment } from "./payments.types";

const PaymentComponent: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [activeTab, setActiveTab] = useState<"payments" | "disputes">(
    "payments"
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: "PAY-001",
        orderId: "ORD-001",
        userId: "1",
        userName: "John Doe",
        amount: 749.98,
        currency: "USD",
        method: "credit_card",
        status: "completed",
        transactionId: "TXN-ABC123",
        date: "2025-05-20T10:30:00Z",
        gateway: "Stripe",
        fees: 22.5,
      },
      {
        id: "PAY-002",
        orderId: "ORD-002",
        userId: "2",
        userName: "Jane Smith",
        amount: 1299.99,
        currency: "USD",
        method: "paypal",
        status: "pending",
        transactionId: "TXN-DEF456",
        date: "2025-05-22T14:15:00Z",
        gateway: "PayPal",
        fees: 39.0,
      },
      {
        id: "PAY-003",
        orderId: "ORD-003",
        userId: "3",
        userName: "Bob Johnson",
        amount: 299.97,
        currency: "USD",
        method: "credit_card",
        status: "disputed",
        transactionId: "TXN-GHI789",
        date: "2025-05-15T09:45:00Z",
        gateway: "Stripe",
        fees: 9.0,
        disputeReason: "Product not received",
      },
    ];

    const mockDisputes: Dispute[] = [
      {
        id: "DIS-001",
        paymentId: "PAY-003",
        reason: "Product not received",
        amount: 299.97,
        status: "investigating",
        createdDate: "2025-05-18T16:20:00Z",
      },
    ];

    setPayments(mockPayments);
    setDisputes(mockDisputes);
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      switch (dateFilter) {
        case "today":
          matchesDate = paymentDate.toDateString() === today.toDateString();
          break;
        case "week": {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = paymentDate >= weekAgo;
          break;
        }
        case "month": {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = paymentDate >= monthAgo;
          break;
        }
      }
    }

    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  const handleStatusChange = (
    paymentId: string,
    newStatus: Payment["status"]
  ) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      )
    );
  };

  const handleRefund = () => {
    if (!selectedPayment || !refundAmount) return;

    const refundAmountNum = parseFloat(refundAmount);
    if (refundAmountNum > selectedPayment.amount) {
      alert("Refund amount cannot exceed payment amount");
      return;
    }

    setPayments(
      payments.map((payment) =>
        payment.id === selectedPayment.id
          ? {
              ...payment,
              status: "refunded" as const,
              refundAmount: refundAmountNum,
              refundDate: new Date().toISOString(),
              refundReason: refundReason,
            }
          : payment
      )
    );

    setShowRefundModal(false);
    setSelectedPayment(null);
    setRefundAmount("");
    setRefundReason("");
  };

  const getMethodIcon = (method: Payment["method"]) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return <CreditCard size={16} />;
      case "paypal":
        return <DollarSign size={16} />;
      case "bank_transfer":
        return <DollarSign size={16} />;
      case "crypto":
        return <DollarSign size={16} />;
      default:
        return <DollarSign size={16} />;
    }
  };

  const RefundModal = () => {
    if (!selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full mx-4">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">Process Refund</h3>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Payment ID: {selectedPayment.id}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Original Amount: ${selectedPayment.amount.toFixed(2)}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Amount
              </label>
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                max={selectedPayment.amount}
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
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reason for refund..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRefund}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Process Refund
              </button>
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedPayment(null);
                  setRefundAmount("");
                  setRefundReason("");
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentsTab = () => (
    <>
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
          <option value="disputed">Disputed</option>
        </select>

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Methods</option>
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="crypto">Cryptocurrency</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-900">
                Payment ID
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Customer
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Amount
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Method
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Gateway
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Date
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="font-medium text-gray-900">{payment.id}</div>
                  <div className="text-xs text-gray-500">
                    Order: {payment.orderId}
                  </div>
                  <div className="text-xs text-gray-500">
                    TXN: {payment.transactionId}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">
                    {payment.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {payment.userId}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">
                    ${payment.amount.toFixed(2)} {payment.currency}
                  </div>
                  <div className="text-xs text-gray-500">
                    Fee: ${payment.fees.toFixed(2)}
                  </div>
                  {payment.refundAmount && (
                    <div className="text-xs text-red-600">
                      Refunded: ${payment.refundAmount.toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getMethodIcon(payment.method)}
                    <span className="text-sm capitalize">
                      {payment.method.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={payment.status}
                    onChange={(e) =>
                      handleStatusChange(
                        payment.id,
                        e.target.value as Payment["status"]
                      )
                    }
                    className="text-sm border-0 bg-transparent focus:ring-0 p-0"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                    <option value="disputed">Disputed</option>
                  </select>
                </td>
                <td className="p-4 text-sm text-gray-900">{payment.gateway}</td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(payment.date).toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {payment.status === "completed" && (
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowRefundModal(true);
                        }}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                      >
                        Refund
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowDetailsModal(true);
                      }}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No payments found matching your criteria.
        </div>
      )}
    </>
  );

  const DisputesTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 font-semibold text-gray-900">
              Dispute ID
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Payment ID
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Reason
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Amount
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Status
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Created
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute) => (
            <tr
              key={dispute.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="p-4 font-medium text-gray-900">{dispute.id}</td>
              <td className="p-4 text-gray-900">{dispute.paymentId}</td>
              <td className="p-4 text-gray-900">{dispute.reason}</td>
              <td className="p-4 font-medium text-gray-900">
                ${dispute.amount.toFixed(2)}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    dispute.status === "open"
                      ? "bg-red-100 text-red-800"
                      : dispute.status === "investigating"
                        ? "bg-yellow-100 text-yellow-800"
                        : dispute.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {dispute.status.charAt(0).toUpperCase() +
                    dispute.status.slice(1)}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-900">
                {new Date(dispute.createdDate).toLocaleDateString()}
              </td>
              <td className="p-4">
                <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
                  Investigate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const PaymentDetailsModal = () => {
    if (!selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Payment Details - {selectedPayment.id}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h4 className="font-semibold mb-3">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedPayment.userName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {"koushik@example.com"}
                  </p>
                  <p>
                    <span className="font-medium">User ID:</span>{" "}
                    {selectedPayment.userId}
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h4 className="font-semibold mb-3">Payment Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Payment Date:</span>{" "}
                    {new Date(selectedPayment.date).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> $
                    {selectedPayment.amount.toFixed(2)}{" "}
                    {selectedPayment.currency}
                  </p>
                  <p>
                    <span className="font-medium">Transaction ID:</span>{" "}
                    {selectedPayment.transactionId}
                  </p>
                  <p>
                    <span className="font-medium">Gateway:</span>{" "}
                    {selectedPayment.gateway}
                  </p>
                  <p>
                    <span className="font-medium">Fees:</span> $
                    {selectedPayment.fees.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {selectedPayment.notes && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Notes</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {selectedPayment.notes}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)} // Hide the modal
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("payments")}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "payments"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab("disputes")}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "disputes"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Disputes ({disputes.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "payments" ? <PaymentsTab /> : <DisputesTab />}

      {/* Payment Statistics */}
      {activeTab === "payments" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              $
              {payments
                .reduce(
                  (sum, p) => sum + (p.status === "completed" ? p.amount : 0),
                  0
                )
                .toFixed(0)}
            </div>
            <div className="text-sm text-green-600">Total Revenue</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {payments.filter((p) => p.status === "completed").length}
            </div>
            <div className="text-sm text-blue-600">Successful Payments</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {payments.filter((p) => p.status === "pending").length}
            </div>
            <div className="text-sm text-yellow-600">Pending Payments</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              $
              {payments
                .reduce((sum, p) => sum + (p.refundAmount || 0), 0)
                .toFixed(0)}
            </div>
            <div className="text-sm text-red-600">Total Refunds</div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && <RefundModal />}
      {showDetailsModal && <PaymentDetailsModal />}
    </div>
  );
};

export default PaymentComponent;
