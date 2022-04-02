/**
 * Navigation types
 */
export interface NavigationProps {
  items: NavigationItemProps[];
}

export interface NavigationItemProps {
  key: string;
  name: string;
  url: string;
  icon: string;
  type?: "nav-heading" | "nav-sublink";
  items?: NavigationItemProps[];
}