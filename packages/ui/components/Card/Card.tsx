import type { CardProps } from "./Card.types";

import "./Card.css";

export function Card({
  children,
  styles,
  className = "",
  ...props
}: CardProps): JSX.Element {
  return <div className="card">{children}</div>;
}

export default Card;
