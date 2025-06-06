// import React, { useState } from "react";
// import { Paperclip, Send } from "lucide-react";

// const ConversationHistory: React.FC = () => {
//   const [message, setMessage] = useState("");
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [actorFilter, setActorFilter] = useState("all");

//   const mockLogs = [
//     {
//       id: 1,
//       type: "clarification",
//       actor: "admin",
//       message:
//         "What style are you looking for? Modern, vintage, or minimalist?",
//       timestamp: "Jan 15, 2024 11:15",
//     },
//     {
//       id: 2,
//       type: "message",
//       actor: "user",
//       message: "I prefer a modern style with green and gold colors",
//       attachment: "reference.jpg",
//       timestamp: "Jan 15, 2024 14:20",
//     },
//     {
//       id: 3,
//       type: "status update",
//       actor: "system",
//       message: "Quote prepared and sent to customer",
//       timestamp: "Jan 16, 2024 09:00",
//     },
//   ];

//   const filteredLogs = mockLogs.filter((log) => {
//     const matchType = typeFilter === "all" || log.type === typeFilter;
//     const matchActor = actorFilter === "all" || log.actor === actorFilter;
//     return matchType && matchActor;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <div className="flex space-x-4">
//         <select
//           value={typeFilter}
//           onChange={(e) => setTypeFilter(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="all">All Types</option>
//           <option value="clarification">Clarification</option>
//           <option value="message">Message</option>
//           <option value="status update">Status Update</option>
//         </select>

//         <select
//           value={actorFilter}
//           onChange={(e) => setActorFilter(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="all">All Actors</option>
//           <option value="admin">Admin</option>
//           <option value="user">User</option>
//           <option value="system">System</option>
//         </select>
//       </div>

//       {/* Timeline */}
//       <div className="space-y-4">
//         {filteredLogs.length > 0 ? (
//           filteredLogs.map((log) => (
//             <div
//               key={log.id}
//               className="border rounded-lg p-4 bg-white shadow-sm space-y-2"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="text-xs font-medium uppercase text-gray-500">
//                   {log.type}
//                 </span>
//                 <span className="text-xs text-gray-400">{log.timestamp}</span>
//               </div>
//               <div className="text-sm text-gray-800">{log.message}</div>
//               {log.attachment && (
//                 <div className="mt-1 text-sm text-blue-600 underline cursor-pointer">
//                   📎 {log.attachment}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="text-sm text-gray-500">No history found.</div>
//         )}
//       </div>

//       {/* Send Message */}
//       <div className="border rounded-lg p-4 bg-white space-y-3 shadow-sm">
//         <textarea
//           placeholder="Type your message or clarification..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           rows={3}
//           className="w-full border rounded-md p-2 text-sm"
//         />
//         <div className="flex justify-between items-center">
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <Paperclip className="w-4 h-4 text-gray-600" />
//             <span className="text-sm text-gray-600">Attach Media</span>
//             <input
//               type="file"
//               hidden
//               onChange={(e) => setAttachment(e.target.files?.[0] || null)}
//             />
//           </label>
//           <button
//             onClick={() => {
//               if (!message.trim()) return alert("Message content required");
//               console.log("Send:", message, attachment);
//               setMessage("");
//               setAttachment(null);
//             }}
//             className="bg-gray-800 text-white text-sm px-4 py-2 rounded inline-flex items-center"
//           >
//             <Send className="w-4 h-4 mr-2" />
//             Send Message
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationHistory;
import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const ConversationHistory: React.FC = () => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [actorFilter, setActorFilter] = useState("all");

  const mockLogs = [
    {
      id: 1,
      type: "clarification",
      actor: "admin",
      message:
        "What style are you looking for? Modern, vintage, or minimalist?",
      timestamp: "Jan 15, 2024 11:15",
    },
    {
      id: 2,
      type: "message",
      actor: "user",
      message: "I prefer a modern style with green and gold colors",
      attachment: "reference.jpg",
      timestamp: "Jan 15, 2024 14:20",
    },
    {
      id: 3,
      type: "status update",
      actor: "system",
      message: "Quote prepared and sent to customer",
      timestamp: "Jan 16, 2024 09:00",
    },
  ];

  const filteredLogs = mockLogs.filter((log) => {
    const matchType = typeFilter === "all" || log.type === typeFilter;
    const matchActor = actorFilter === "all" || log.actor === actorFilter;
    return matchType && matchActor;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Types</option>
          <option value="clarification">Clarification</option>
          <option value="message">Message</option>
          <option value="status update">Status Update</option>
        </select>

        <select
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Actors</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="system">System</option>
        </select>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => {
            const isUser = log.actor === "user";
            const bubbleColor =
              log.actor === "user"
                ? "bg-blue-100 text-blue-900 rounded-br-none"
                : log.actor === "admin"
                  ? "bg-gray-100 text-gray-800 rounded-bl-none"
                  : "bg-yellow-100 text-yellow-900 text-center";
            return (
              <div
                key={log.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-2xl shadow-sm text-sm ${bubbleColor}`}
                >
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      {log.actor === "user" && "\ud83d\udc64"}
                      {log.actor === "admin" && "\ud83d\udee1\ufe0f"}
                      {log.actor === "system" && "\u2699\ufe0f"} {log.type}
                    </span>
                    <span className="text-gray-500">{log.timestamp}</span>
                  </div>
                  <div>{log.message}</div>
                  {log.attachment && (
                    <div className="mt-1 text-blue-600 underline cursor-pointer">
                      \ud83d\udccc {log.attachment}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-500">No history found.</div>
        )}
      </div>

      {/* Send Message */}
      <div className="border rounded-lg bg-white p-4 shadow-sm space-y-3">
        <textarea
          placeholder="Type your message or clarification..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full rounded-lg px-4 py-2 text-sm bg-gray-50 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        ></textarea>

        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-blue-600">
            <Paperclip className="w-4 h-4" />
            <span className="text-sm">Attach Media</span>
            <input
              type="file"
              hidden
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
            />
          </label>
          <button
            onClick={() => {
              if (!message.trim()) return alert("Message content required");
              console.log("Send:", message, attachment);
              setMessage("");
              setAttachment(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm flex items-center"
          >
            <Send className="w-4 h-4 mr-1" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;
