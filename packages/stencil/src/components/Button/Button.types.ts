/**
 * Button types
 */
export type ButtonVariantTypes = "primary" | "secondary" | "warn" | "error";

export interface ButtonProps {
  variant?: ButtonVariantTypes;
  children?: React.ReactNode;
  className?: string;
  style?: { [key: string]: string };
}

