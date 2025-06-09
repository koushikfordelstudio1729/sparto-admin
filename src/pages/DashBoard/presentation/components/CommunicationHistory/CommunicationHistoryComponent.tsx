// src/pages/DashBoard/presentation/components/CommunicationHistory/CommunicationHistory.tsx

import React, { useEffect, useState } from "react";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import { StatCard } from "@/commons/components/StatCard/StatCard";
import { Send } from "lucide-react";
import type {
  Communication,
  CommunicationStatus,
  CommunicationType,
} from "./CommunicationHistory.types";
import { mockCommunications } from "./testData";
import MessagesTable from "./components/MessagesTable";
import CommunicationDetailsModal from "./components/CommunicationDetails";
import SendReplyModal from "./components/SendMessage";
import CustomButton from "@/commons/components/Button";
import { DASHBOARD_STATS } from "../../utils/dashboardConstant";

const CommunicationHistory: React.FC = () => {
  // --- State ---
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | Communication["type"]>(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | Communication["status"]
  >("all");

  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  // --- Load mock on mount ---
  useEffect(() => {
    setCommunications(mockCommunications);
  }, []);

  // --- Filtering logic ---
  const filtered = communications.filter((c) => {
    const matchSearch =
      c.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.subject?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      c.data.toLowerCase().includes(searchTerm.toLowerCase());

    const matchType = typeFilter === "all" || c.type === typeFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  // --- Handlers ---
  const openDetails = (comm: Communication) => {
    setSelectedComm(comm);
    setShowDetails(true);
  };

  const openReply = (comm: Communication) => {
    setSelectedComm(comm);
    setShowReply(true);
  };

  const handleSendReply = () => {
    if (!selectedComm || !replyText.trim()) return;

    const newReply: Communication = {
      ...selectedComm,
      id: `COM-${Date.now()}`, // new unique ID
      date: new Date().toISOString(), // now
      data: replyText, // the reply text
      status: "sent", // mark as sent
      subject: selectedComm.subject ? `Re: ${selectedComm.subject}` : undefined,
    };

    // prepend to list
    setCommunications([newReply, ...communications]);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Communication History
        </h2>
        <CustomButton
          onClick={() => setShowReply(true)}
          variant="secondary"
          size="md"
        >
          <div className="flex items-center gap-2">
            <Send size={20} /> Compose Message
          </div>
        </CustomButton>
      </div>

      {/* Filters */}
      <FilterBar
        search={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search communications…",
        }}
        filters={[
          {
            value: typeFilter,
            onChange: (v: string) =>
              setTypeFilter(v as CommunicationType | "all"),
            options: [
              { value: "all", label: "All Types" },
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
              { value: "sms", label: "SMS" },
            ],
          },
          {
            value: statusFilter,
            onChange: (v: string) =>
              setStatusFilter(v as CommunicationStatus | "all"),
            options: [
              { value: "all", label: "All Statuses" },
              { value: "sent", label: "Sent" },
              { value: "delivered", label: "Delivered" },
              { value: "read", label: "Read" },
              { value: "pending", label: "Pending" },
            ],
          },
        ]}
        className="mb-4"
      />

      {/* Table */}
      <MessagesTable
        communications={filtered}
        onViewDetails={openDetails}
        onReply={openReply}
      />

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Details Modal */}
      {selectedComm && (
        <CommunicationDetailsModal
          isOpen={showDetails}
          communication={selectedComm}
          replyMessage={replyText}
          onReplyChange={setReplyText}
          onSendReply={handleSendReply}
          onClearReply={() => setReplyText("")}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* Quick Reply Modal */}
      {showReply && selectedComm && (
        <SendReplyModal
          communication={selectedComm}
          replyMessage={replyText}
          onReplyChange={setReplyText}
          onSendReply={handleSendReply}
          onClose={() => {
            setShowReply(false);
            setReplyText("");
          }}
        />
      )}
    </div>
  );
};

export default CommunicationHistory;
