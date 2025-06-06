import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import type { QuoteEntity } from "@/commons/domain/entities/QuoteEntity";
import ConversationHistory from "../components/ConversationHistory";
import QuotePreparationForm from "../components/QuotePreparationForm";
import QuoteHistoryList from "../components/QuoteHistoryList";
import QuoteDetailsModal from "../components/QuoteDetailsModal";

// 🔷 Props expected from parent
interface QuoteManagementProps {
  orderId: string;
  customerName: string;
  createdAt: number;
  totalValue: number;
  onBack: () => void;
}

// 🔷 Quote preparation form structure
interface QuoteFormData {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    tax: number;
    total: number;
  }>;
  subtotal: number;
  totalTax: number;
  totalAmount: number;
  validityPeriod: number;
  notes: string;
  attachments: File[];
}

const QuoteManagementComponent: React.FC<QuoteManagementProps> = ({
  orderId,
  customerName,
  createdAt,
  totalValue,
  onBack,
}) => {
  console.log("QuoteManagementComponent is calling ");
  const [activeTab, setActiveTab] = useState<string>("conversation");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteEntity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  const allQuotes: QuoteEntity[] = []; // 🔸 Replace with actual quotes data as needed

  const filteredQuotes = allQuotes.filter((quote) => {
    const matchesSearch =
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const quoteDate = new Date(quote.createdAt);
      const today = new Date();
      switch (dateFilter) {
        case "today":
          matchesDate = quoteDate.toDateString() === today.toDateString();
          break;
        case "week":
          matchesDate =
            quoteDate >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          matchesDate =
            quoteDate >= new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const tabs = [
    { id: "conversation", label: "Conversation & History", icon: "💬" },
    { id: "quote_preparation", label: "Quote Preparation", icon: "📝" },
    { id: "quote_history", label: "Quote History", icon: "📋" },
  ];

  const handleQuoteSave = (quoteData: QuoteFormData): void => {
    console.log("Quote saved:", quoteData);
  };

  const handleQuoteSend = (quoteData: QuoteFormData): void => {
    console.log("Quote sent:", quoteData);
  };

  const handleQuoteCancel = (): void => {
    console.log("Quote cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 border border-red-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Order Management
                </h1>
                <p className="text-sm text-gray-500">
                  Managing order {orderId} for {customerName}
                </p>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            📊 Order Summary
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500">Order ID</div>
              <div className="font-medium text-gray-900">{orderId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Customer</div>
              <div className="font-medium text-gray-900">{customerName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Created</div>
              <div className="font-medium text-gray-900">
                {new Date(createdAt * 1000).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="font-medium text-gray-900">
                ${totalValue.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "conversation" && <ConversationHistory />}

            {activeTab === "quote_preparation" && (
              <QuotePreparationForm
                orderId={orderId}
                onSaveDraft={handleQuoteSave}
                onSendQuote={handleQuoteSend}
                onCancelQuote={handleQuoteCancel}
              />
            )}

            {activeTab === "quote_history" && (
              <>
                <div className="mb-6">
                  <FilterBar
                    search={{
                      value: searchTerm,
                      onChange: setSearchTerm,
                      placeholder: "Search quotes...",
                    }}
                    filters={[
                      {
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [
                          { value: "all", label: "All Status" },
                          { value: "draft", label: "Draft" },
                          { value: "sent", label: "Sent" },
                          { value: "updated", label: "Updated" },
                          { value: "cancelled", label: "Cancelled" },
                          { value: "expired", label: "Expired" },
                        ],
                      },
                      {
                        value: dateFilter,
                        onChange: setDateFilter,
                        options: [
                          { value: "all", label: "All Time" },
                          { value: "today", label: "Today" },
                          { value: "week", label: "This Week" },
                          { value: "month", label: "This Month" },
                        ],
                      },
                    ]}
                  />
                </div>
                <QuoteHistoryList
                  quotes={filteredQuotes}
                  setSelectedQuote={setSelectedQuote}
                  setShowDetailsModal={setShowDetailsModal}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <QuoteDetailsModal
          selectedQuote={selectedQuote}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default QuoteManagementComponent;
