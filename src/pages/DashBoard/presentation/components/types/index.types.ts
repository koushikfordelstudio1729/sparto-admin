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
