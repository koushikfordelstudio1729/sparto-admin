export interface Notification {
  id: number;
  message: string;
  fullMessage: string;
  read: boolean;
  expanded: boolean;
}

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
}

export interface HeaderProps {
  activeTab: string;
  setRightSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RightSidebarProps {
  rightSidebarOpen: boolean;
  setRightSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
  handleNotificationClick: (id: number) => void;
}

export interface NotificationProps {
  notification: Notification;
  handleNotificationClick: (id: number) => void;
}
