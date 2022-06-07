import type { IconType } from "react-icons/lib";

export interface NavigationDrawerProps {
  items: NavigationDrawerItemProps[];
  isOpen: boolean;
}

export interface NavigationDrawerItemProps {
  name: string;
  url: string;
  icon?: IconType | string; 
  items?: NavigationDrawerItemProps[];
  isOpen?: boolean;
  type?: "nav-drawer-header" | "nav-drawer-item";
}

export function isIconType(icon: IconType | string): icon is IconType {
  return typeof icon === "function";
}

