import type { ButtonProps } from './Button.types';

import './Button.css';

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
