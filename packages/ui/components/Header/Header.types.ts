export interface HeaderLinks {
  icon: any;
  link?: string;
  action?: () => void;
}

export interface HeaderProps {
  brand?: string;
  logo?: string;
  links?: HeaderLinks[];
}
