import type { IconType } from "react-icons/lib";

export interface NavigationDrawerProps {
  items: NavigationDrawerItemProps[];
}

export interface NavigationDrawerItemProps {
  name: string;
  url: string;
  icon?: IconType; 
  items?: NavigationDrawerItemProps[];
  type?: "nav-header" | "nav-sublink";
}

