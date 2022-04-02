import React, { useEffect } from "react";

import './Button.module.css';

export interface ButtonProps {
  variant?: "primary" | "secondary" | "warning" | "danger" | "success";
  className?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
}

export function Button({
  children,
  variant = "primary",
  styles,
  className = "",
  ...props
}: ButtonProps): JSX.Element {

  className += ` btn btn-${variant}`;

  return <button className={className}>{children}</button>;
}

export default Button;
