import FilterBar from "@/commons/components/FilterBar/FilterBar";
import { StatCard } from "@/commons/components/StatCard/StatCard";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DASHBOARD_STATS } from "../../utils/dashboardConstant";
import type { Communication } from "./CommunicationHistory.types";
import CommunicationDetailsModal from "./components/CommunicationDetails";
import MessagesTab from "./components/MessagesTable";
import SendReplyModal from "./components/SendMessage";
import { mockCommunications } from "./testData";
import CustomButton from "@/commons/components/Button";

const CommunicationHistory: React.FC = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedCommunication, setSelectedCommunication] =
    useState<Communication | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"messages" | "threads">(
    "messages"
  );
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    setCommunications(mockCommunications);
  }, []);

  const filteredCommunications = communications.filter((comm) => {
    const matchesSearch =
      comm.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comm.subject &&
        comm.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      comm.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || comm.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || comm.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || comm.priority === priorityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleReply = (communicationId: string) => {
    if (!replyMessage.trim()) return;

    const originalComm = communications.find((c) => c.id === communicationId);
    if (!originalComm) return;
    const newReply: Communication = {
      id: `COM-${Date.now()}`,
      userId: originalComm.userId,
      userName: originalComm.userName,
      userEmail: originalComm.userEmail,
      type: originalComm.type,
      subject: originalComm.subject ? `Re: ${originalComm.subject}` : undefined,
      message: replyMessage,
      status: "sent",
      timestamp: new Date().toISOString(),
      adminId: "ADM-001",
      adminName: "Current Admin",
      priority: originalComm.priority,
      relatedOrderId: originalComm.relatedOrderId,
      relatedQuoteId: originalComm.relatedQuoteId,
    };

    setCommunications((prevCommunications) => [
      newReply,
      ...prevCommunications,
    ]);

    setReplyMessage("");
    setShowDetailsModal(false);
    setShowComposeModal(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Communication History
        </h2>

        <CustomButton
          onClick={() => setShowComposeModal(true)}
          variant="secondary"
          size="md"
          disabled={false}
        >
          <div className="flex items-center gap-2">
            {" "}
            <Send size={20} className="mr-2" />
            <p className="text-white">Compose Message</p>
          </div>
        </CustomButton>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "messages"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          All Messages
        </button>
      </div>

      {/* Filters and Search */}
      <FilterBar
        search={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search communications...",
        }}
        filters={[
          {
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { value: "all", label: "All Types" },
              { value: "email", label: "Email" },
              { value: "chat", label: "Chat" },
              { value: "phone", label: "Phone" },
              { value: "sms", label: "SMS" },
              { value: "support_ticket", label: "Support Ticket" },
            ],
          },
          {
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "sent", label: "Sent" },
              { value: "delivered", label: "Delivered" },
              { value: "read", label: "Read" },
              { value: "replied", label: "Replied" },
              { value: "pending", label: "Pending" },
            ],
          },
          {
            value: priorityFilter,
            onChange: setPriorityFilter,
            options: [
              { value: "all", label: "All Priority" },
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
              { value: "urgent", label: "Urgent" },
            ],
          },
        ]}
        className="mb-6"
      />

      <MessagesTab
        communications={filteredCommunications}
        onViewDetails={(comm) => {
          setSelectedCommunication(comm);
          setShowDetailsModal(true);
        }}
        onReply={(comm) => {
          setSelectedCommunication(comm);
          setShowComposeModal(true);
        }}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {showComposeModal && selectedCommunication && (
        <SendReplyModal
          communication={selectedCommunication}
          replyMessage={replyMessage}
          onReplyChange={setReplyMessage}
          onSendReply={() => handleReply(selectedCommunication.id)}
          onClose={() => setShowComposeModal(false)}
        />
      )}

      {showDetailsModal && selectedCommunication && (
        <CommunicationDetailsModal
          communication={selectedCommunication}
          replyMessage={replyMessage}
          onReplyChange={setReplyMessage}
          onSendReply={() => handleReply(selectedCommunication.id)}
          onClearReply={() => setReplyMessage("")}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default CommunicationHistory;
