// components/QuoteHistoryList.tsx
import React, { useState } from "react";
import { Eye, GitCompare } from "lucide-react";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import IconButton from "@/commons/components/IconButton/IconButton";
import type { QuoteEntity } from "@/commons/domain/entities/QuoteEntity";

interface QuoteHistoryListProps {
  quotes: QuoteEntity[];
  setSelectedQuote: (quote: QuoteEntity) => void;
  setShowDetailsModal: (show: boolean) => void;
}

const QuoteHistoryList: React.FC<QuoteHistoryListProps> = ({
  quotes,
  setSelectedQuote,
  setShowDetailsModal,
}) => {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

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

  // Sample quotes for demo if none provided
  const displayQuotes =
    quotes.length > 0
      ? quotes
      : [
          {
            id: "QUO-001",
            orderId: "ORD-001",
            version: 1,
            status: "sent" as const,
            totalAmount: 1250,
            items: [
              {
                id: "1",
                name: "Logo Design",
                quantity: 1,
                price: 750,
                tax: 0,
                total: 750,
              },
              {
                id: "2",
                name: "Business Card Design",
                quantity: 1,
                price: 350,
                tax: 0,
                total: 350,
              },
            ],
            subtotal: 1100,
            totalTax: 0,
            validityPeriod: 30,
            validUntil: new Date("2024-02-15"),
            notes: "Initial quote with basic design package",
            createdAt: new Date("2024-01-16"),
            updatedAt: new Date("2024-01-16"),
            createdBy: "admin",
          },
          {
            id: "QUO-001-V2",
            orderId: "ORD-001",
            version: 2,
            status: "updated" as const,
            totalAmount: 1150,
            items: [
              {
                id: "1",
                name: "Logo Design",
                quantity: 1,
                price: 750,
                tax: 0,
                total: 750,
              },
              {
                id: "2",
                name: "Business Card Design",
                quantity: 1,
                price: 400,
                tax: 0,
                total: 400,
              },
            ],
            subtotal: 1150,
            totalTax: 0,
            validityPeriod: 30,
            validUntil: new Date("2024-02-16"),
            notes: "Updated pricing for business card design",
            createdAt: new Date("2024-01-17"),
            updatedAt: new Date("2024-01-17"),
            createdBy: "admin",
          },
        ];

  const handleQuoteSelection = (quoteId: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Quote History</h3>
        {selectedQuotes.length >= 2 && (
          <button
            onClick={() => console.log("Compare quotes:", selectedQuotes)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <GitCompare className="h-4 w-4 mr-2" />
            Compare
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-900 w-12">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Quote ID
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Version
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Created
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Amount
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Items
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Valid Until
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayQuotes.map((quote) => (
              <tr
                key={quote.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedQuotes.includes(quote.id)}
                    onChange={() => handleQuoteSelection(quote.id)}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                </td>
                <td className="p-4 font-medium text-gray-900">{quote.id}</td>
                <td className="p-4 text-sm text-gray-600">
                  Version {quote.version}
                </td>
                <td className="p-4 text-sm text-gray-900">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 font-medium text-gray-900">
                  ${parseFloat(quote.totalAmount.toString()).toFixed(2)}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {quote.items.length} item(s)
                </td>
                <td className="p-4 text-sm text-gray-900">
                  {new Date(quote.validUntil).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <StatusBadge
                    text={
                      quote.status.charAt(0).toUpperCase() +
                      quote.status.slice(1)
                    }
                    className={getStatusClass(quote.status)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <IconButton
                      icon={Eye}
                      title="View Details"
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:bg-blue-100"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayQuotes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No quotes found for the selected filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteHistoryList;
