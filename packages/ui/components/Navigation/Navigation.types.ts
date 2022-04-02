export interface NavigationDrawerProps {
  items: NavigationDrawerItemProps[];
}

export interface NavigationDrawerItemProps {
  name: string;
  url: string;
  icon: string;
  items?: NavigationDrawerItemProps[];
  type: "nav-header" | "nav-sublink";
}