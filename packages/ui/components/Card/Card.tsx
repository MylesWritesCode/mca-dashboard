import type { CardProps, CardHeaderProps, CardFooterProps } from "./Card.types";

import "./Card.css";

export function Card({
  children,
  styles,
  className = "",
  ...props
}: CardProps): JSX.Element {
  return <div className="card">{children}</div>;
}

function Header({ title }: CardHeaderProps): JSX.Element {
  return (
    <div className="card-row">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

function Footer({ title }: CardFooterProps): JSX.Element {
  return (
    <div className="card-row">
      <div className="card-footer">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

Card.Header = Header;
Card.Footer = Footer;

export default Card;
