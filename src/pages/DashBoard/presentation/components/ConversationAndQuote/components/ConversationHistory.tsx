import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Paperclip,
  Send,
  User as UserIcon,
  Users as AdminIcon,
} from "lucide-react";

import { useConversationAndQuoteDI } from "../ConversationAndQuote.di";
import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
import type { RootState } from "@/app/store/store";
import type { ConversationHistoryProps } from "../ConversationAndQuote.type";

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  requestId,
  actorId,
  actorType,
}) => {
  const vm = useConversationAndQuoteDI();
  const logs = useSelector(
    (state: RootState) => state.conversationAndQuote.logs
  );
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    vm.initialize(requestId);
  }, [vm, requestId]);

  // Send a new message
  const handleSend = () => {
    if (!message.trim()) return;
    const now = Math.floor(Date.now() / 1000);
    const entity: ClarificationEntity = {
      id: "",
      requestId,
      actorId,
      actorType,
      message,
      media: attachment
        ? [
            {
              file_url: "",
              file_name: attachment.name,
              file_type: attachment.type,
              uploaded_at: now,
            },
          ]
        : [],
      createdAt: now,
    };
    vm.sendMessage(entity);
    setMessage("");
    setAttachment(null);
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {logs.length === 0 && (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
        {logs.map((log) => {
          const isUser = log.actorType === "user";
          const BubbleIcon = isUser ? UserIcon : AdminIcon;

          return (
            <div
              key={log.id}
              className={`flex ${isUser ? "justify-start" : "justify-end"}`}
            >
              <div className="max-w-[70%]">
                <div className="flex items-end space-x-2">
                  {isUser && <BubbleIcon className="w-6 h-6 text-blue-600" />}

                  <div
                    className={`
                      relative px-4 py-3 rounded-2xl shadow text-base leading-snug
                      ${
                        isUser
                          ? "bg-[#DCE8FF] text-black rounded-bl-none"
                          : "bg-[#4399FF] text-white rounded-br-none"
                      }
                    `}
                  >
                    {/* Message text */}
                    <div>{log.message}</div>
                    {/* Timestamp inside bubble */}
                    <div className="mt-1 text-xs text-gray-200 text-right">
                      {new Date(log.createdAt * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {!isUser && <BubbleIcon className="w-6 h-6 text-gray-400" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-center space-x-2">
        <label className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
          <Paperclip className="w-5 h-5 text-gray-500" />
          <input
            type="file"
            className="hidden"
            onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
          />
        </label>
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 resize-none border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() && !attachment}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-full transition"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ConversationHistory;
