import { BiDotsVerticalRounded } from "react-icons/bi";

import "./Card.css";
import type { CardProps, CardHeaderProps, CardFooterProps } from "./Card.types";

export function Card({ children, styles, className = "", ...props }: CardProps): JSX.Element {
  return <div className={["card-container", className].join(" ")}>{children}</div>;
}

function Header({ title }: CardHeaderProps): JSX.Element {
  return (
    <div className="card-header">
      <h3 className="font-semibold">{title}</h3>
      <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" />
    </div>
  );
}

function Footer({ title }: CardFooterProps): JSX.Element {
  return (
    <div className="flex items-center justify-between bg-[#ffffff88] p-6">
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}

Card.Header = Header;
Card.Footer = Footer;

export default Card;
