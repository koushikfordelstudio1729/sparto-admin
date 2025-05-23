import React, { useState, useEffect } from "react";
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Eye,
} from "lucide-react";

interface CommunicationThread {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  messageCount: number;
  status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
}

interface Communication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: "email" | "chat" | "phone" | "sms" | "support_ticket";
  direction: "inbound" | "outbound";
  subject?: string;
  message: string;
  status: "sent" | "delivered" | "read" | "replied" | "pending";
  timestamp: string;
  adminId?: string;
  adminName?: string;
  relatedOrderId?: string;
  relatedQuoteId?: string;
  priority: "low" | "medium" | "high" | "urgent";
  tags?: string[];
}

const CommunicationHistory: React.FC = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [threads, setThreads] = useState<CommunicationThread[]>([]);
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
    const mockCommunications: Communication[] = [
      {
        id: "COM-001",
        userId: "1",
        userName: "John Doe",
        userEmail: "john@example.com",
        type: "email",
        direction: "inbound",
        subject: "Question about my order",
        message:
          "Hi, I wanted to check the status of my recent order ORD-001. When can I expect delivery?",
        status: "read",
        timestamp: "2025-05-22T14:30:00Z",
        relatedOrderId: "ORD-001",
        priority: "medium",
        tags: ["order-inquiry", "delivery"],
      },
      {
        id: "COM-002",
        userId: "1",
        userName: "John Doe",
        userEmail: "john@example.com",
        type: "email",
        direction: "outbound",
        subject: "Re: Question about my order",
        message:
          "Thank you for contacting us. Your order ORD-001 is currently being processed and will be shipped within 2-3 business days. You will receive a tracking number once shipped.",
        status: "sent",
        timestamp: "2025-05-22T15:45:00Z",
        adminId: "ADM-001",
        adminName: "Sarah Admin",
        relatedOrderId: "ORD-001",
        priority: "medium",
      },
      {
        id: "COM-003",
        userId: "2",
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        type: "chat",
        direction: "inbound",
        message:
          "I need to modify my quote QUO-002. Can we add additional services?",
        status: "pending",
        timestamp: "2025-05-23T10:15:00Z",
        relatedQuoteId: "QUO-002",
        priority: "high",
        tags: ["quote-modification", "urgent"],
      },
      {
        id: "COM-004",
        userId: "3",
        userName: "Bob Johnson",
        userEmail: "bob@example.com",
        type: "support_ticket",
        direction: "inbound",
        subject: "Payment failed",
        message:
          "My payment for order ORD-003 failed. I tried multiple times but it keeps getting declined. Please help.",
        status: "pending",
        timestamp: "2025-05-23T09:30:00Z",
        relatedOrderId: "ORD-003",
        priority: "urgent",
        tags: ["payment-issue", "technical-support"],
      },
      {
        id: "COM-005",
        userId: "2",
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        type: "phone",
        direction: "outbound",
        message:
          "Called customer to discuss project requirements and timeline. Customer confirmed additional features needed for marketing campaign.",
        status: "delivered",
        timestamp: "2025-05-21T16:20:00Z",
        adminId: "ADM-002",
        adminName: "Mike Sales",
        relatedQuoteId: "QUO-002",
        priority: "medium",
      },
    ];

    const mockThreads: CommunicationThread[] = [
      {
        id: "THR-001",
        userId: "1",
        userName: "John Doe",
        subject: "Order Status Inquiry",
        lastMessage: "Thank you for the update!",
        lastMessageTime: "2025-05-22T16:00:00Z",
        messageCount: 3,
        status: "closed",
        priority: "medium",
      },
      {
        id: "THR-002",
        userId: "2",
        userName: "Jane Smith",
        subject: "Quote Modification Request",
        lastMessage: "I need to modify my quote QUO-002",
        lastMessageTime: "2025-05-23T10:15:00Z",
        messageCount: 1,
        status: "open",
        priority: "high",
        assignedTo: "Mike Sales",
      },
      {
        id: "THR-003",
        userId: "3",
        userName: "Bob Johnson",
        subject: "Payment Issues",
        lastMessage: "My payment keeps getting declined",
        lastMessageTime: "2025-05-23T09:30:00Z",
        messageCount: 1,
        status: "pending",
        priority: "urgent",
      },
    ];

    setCommunications(mockCommunications);
    setThreads(mockThreads);
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

  const getTypeIcon = (type: Communication["type"]) => {
    switch (type) {
      case "email":
        return <Mail size={16} />;
      case "chat":
        return <MessageCircle size={16} />;
      case "phone":
        return <Phone size={16} />;
      case "sms":
        return <MessageSquare size={16} />;
      case "support_ticket":
        return <MessageCircle size={16} />;
      default:
        return <MessageCircle size={16} />;
    }
  };

  const getStatusBadge = (status: Communication["status"]) => {
    const colors = {
      sent: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      read: "bg-purple-100 text-purple-800",
      replied: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (
    priority: Communication["priority"] | CommunicationThread["priority"]
  ) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const CommunicationDetailsModal = () => {
    if (!selectedCommunication) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Communication Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Communication Header */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getTypeIcon(selectedCommunication.type)}
                  <span className="font-medium capitalize">
                    {selectedCommunication.type.replace("_", " ")}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedCommunication.direction === "inbound"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedCommunication.direction}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(selectedCommunication.priority)}
                  {getStatusBadge(selectedCommunication.status)}
                </div>
              </div>
              {selectedCommunication.subject && (
                <h4 className="text-lg font-semibold mb-2">
                  {selectedCommunication.subject}
                </h4>
              )}
              <div className="text-sm text-gray-600">
                <p>
                  <strong>From:</strong> {selectedCommunication.userName} (
                  {selectedCommunication.userEmail})
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(selectedCommunication.timestamp).toLocaleString()}
                </p>
                {selectedCommunication.adminName && (
                  <p>
                    <strong>Handled by:</strong>{" "}
                    {selectedCommunication.adminName}
                  </p>
                )}
                {selectedCommunication.relatedOrderId && (
                  <p>
                    <strong>Related Order:</strong>{" "}
                    {selectedCommunication.relatedOrderId}
                  </p>
                )}
                {selectedCommunication.relatedQuoteId && (
                  <p>
                    <strong>Related Quote:</strong>{" "}
                    {selectedCommunication.relatedQuoteId}
                  </p>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Message</h4>
              <div className="bg-white border rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedCommunication.message}
                </p>
              </div>
            </div>

            {/* Tags */}
            {selectedCommunication.tags &&
              selectedCommunication.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommunication.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Reply Section */}
            {selectedCommunication.direction === "inbound" &&
              selectedCommunication.status === "pending" && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Quick Reply</h4>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your reply..."
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleReply(selectedCommunication.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Send Reply
                    </button>
                    <button
                      onClick={() => setReplyMessage("")}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };
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
      direction: "outbound",
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

  const MessagesTab = () => (
    <>
      {/* Communications Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-900">
                Type
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Customer
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Subject/Message
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Direction
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Priority
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Time
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCommunications.map((comm) => (
              <tr
                key={comm.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(comm.type)}
                    <span className="text-sm capitalize">
                      {comm.type.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {comm.userName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {comm.userEmail}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    {comm.subject && (
                      <div className="font-medium text-gray-900 mb-1">
                        {comm.subject}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      {comm.message.length > 100
                        ? comm.message.substring(0, 100) + "..."
                        : comm.message}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      comm.direction === "inbound"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {comm.direction}
                  </span>
                </td>
                <td className="p-4">{getStatusBadge(comm.status)}</td>
                <td className="p-4">{getPriorityBadge(comm.priority)}</td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">
                    {new Date(comm.timestamp).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(comm.timestamp).toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCommunication(comm); // Ensure selectedCommunication is set
                        setShowDetailsModal(true); // Show details modal
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {comm.direction === "inbound" &&
                      comm.status === "pending" && (
                        <button
                          onClick={() => {
                            setSelectedCommunication(comm);
                            setShowComposeModal(true);
                          }}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Reply"
                        >
                          <Send size={16} />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCommunications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No communications found matching your criteria.
        </div>
      )}
    </>
  );

  const SendReplyModal = () => {
    if (!selectedCommunication) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-96 p-6">
          <div className="text-xl font-semibold mb-4">Compose Reply</div>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Type your reply..."
          ></textarea>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => handleReply(selectedCommunication?.id || "")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Reply
            </button>
            <button
              onClick={() => setShowComposeModal(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Communication History
        </h2>
        <button
          onClick={() => setShowComposeModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Send size={20} />
          Compose Message
        </button>
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
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search communications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="email">Email</option>
          <option value="chat">Chat</option>
          <option value="phone">Phone</option>
          <option value="sms">SMS</option>
          <option value="support_ticket">Support Ticket</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>

          <>
            <option value="sent">Sent</option>
            <option value="delivered">Delivered</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="pending">Pending</option>
          </>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <MessagesTab />

      {/* Communication Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {communications.length}
          </div>
          <div className="text-sm text-blue-600">Total Communications</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {communications.filter((c) => c.status === "pending").length}
          </div>
          <div className="text-sm text-yellow-600">Pending Responses</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {communications.filter((c) => c.priority === "urgent").length}
          </div>
          <div className="text-sm text-red-600">Urgent Messages</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {threads.filter((t) => t.status === "open").length}
          </div>
          <div className="text-sm text-green-600">Open Threads</div>
        </div>
      </div>

      {showComposeModal && <SendReplyModal />}
      {showDetailsModal && <CommunicationDetailsModal />}
    </div>
  );
};

export default CommunicationHistory;
