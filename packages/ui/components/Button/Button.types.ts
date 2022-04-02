export interface ButtonProps {
  variant?: "primary" | "secondary" | "warning" | "danger" | "success";
  className?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
}
