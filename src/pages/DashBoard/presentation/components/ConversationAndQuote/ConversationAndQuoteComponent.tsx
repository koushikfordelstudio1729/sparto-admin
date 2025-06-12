import React, { useState } from "react";
import { ArrowLeft, Calendar, Hash, DollarSign } from "lucide-react";

import ConversationHistory from "./components/ConversationHistory";
import QuotePreparationForm from "./components/QuotePreparationForm";
import type { QuoteFormPayload } from "./components/QuotePreparationForm";

import type { QuoteManagementProps } from "./ConversationAndQuote.type";
import { ConversationTabs } from "./ConversationAndQuote.type";

const QuoteManagementComponent: React.FC<QuoteManagementProps> = ({
  requestId,

  createdAt,
  totalValue,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<
    "conversation" | "quote_preparation"
  >("conversation");

  const handleQuoteSave = (data: QuoteFormPayload) => {
    console.log("Saving draft:", data);
  };
  const handleQuoteSend = (data: QuoteFormPayload) => {
    console.log("Sending quote:", data);
  };
  const handleQuoteCancel = () => {
    console.log("Quote cancelled for request", requestId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Summary Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative bg-white rounded-xl shadow-lg p-8 mb-6 overflow-hidden">
          <div className="absolute -top-10 right-6 text-blue-100 opacity-20 transform rotate-45">
            <Hash className="w-32 h-32" />
          </div>

          {/* Header with back button and title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                Request Summary
              </h2>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center space-x-3 p-4 bg-blue-50 rounded-lg break-all">
              <Hash className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-sm text-blue-800">Request ID</div>
                <div className="font-semibold text-gray-900">{requestId}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-sm text-yellow-800">Created</div>
                <div className="font-semibold text-gray-900">
                  {new Date(createdAt * 1000).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-sm text-red-800">Total Value</div>
                <div className="font-semibold text-gray-900">
                  ${totalValue.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow py-6 mb-6">
          <nav className="flex space-x-8 px-6 border-b border-gray-200">
            {ConversationTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-2 text-lg font-medium transition focus:outline-none ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <tab.icon
                    className={
                      isActive
                        ? "text-blue-600 w-6 h-6"
                        : "text-gray-600 w-6 h-6"
                    }
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4">
            {activeTab === "conversation" && (
              <ConversationHistory
                requestId={requestId}
                actorId="admin"
                actorType="admin"
              />
            )}

            {activeTab === "quote_preparation" && (
              <QuotePreparationForm
                requestId={requestId}
                onSaveDraft={handleQuoteSave}
                onSendQuote={handleQuoteSend}
                onCancelQuote={handleQuoteCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteManagementComponent;
