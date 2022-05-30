import type { CardProps, CardHeaderProps, CardFooterProps } from "./Card.types";
import { BiDotsVerticalRounded } from "react-icons/bi";

import "./Card.css";
import { IconBase } from "react-icons/lib";

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
    <div className="card-header">
      <h3>{title}</h3>
      <BiDotsVerticalRounded className="icon" />
    </div>
  );
}

function Footer({ title }: CardFooterProps): JSX.Element {
  return (
    <div className="card-footer">
      <h3>{title}</h3>
    </div>
  );
}

Card.Header = Header;
Card.Footer = Footer;

export default Card;
