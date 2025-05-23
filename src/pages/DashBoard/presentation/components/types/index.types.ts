export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: React.ElementType;
  isLogout?: boolean;
}

export interface NavButtonProps {
  item: NavigationItem;
  isActive: boolean;
  sidebarOpen: boolean;
}

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
}
