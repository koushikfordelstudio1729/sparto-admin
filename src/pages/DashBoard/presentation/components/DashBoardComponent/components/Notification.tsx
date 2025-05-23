import React from "react";
import type { NotificationProps } from "../DashBoard.types";

const Notification: React.FC<NotificationProps> = ({
  notification,
  handleNotificationClick,
}) => (
  <li
    key={notification.id}
    onClick={() => handleNotificationClick(notification.id)}
    className={`py-2 px-4 border-b cursor-pointer ${
      notification.read ? "bg-gray-100" : "bg-blue-50"
    }`}
  >
    <p>{notification.message}</p>
    {notification.expanded && (
      <div className="mt-2 text-sm text-gray-600">
        <p>{notification.fullMessage}</p>
      </div>
    )}
  </li>
);

export default Notification;
