import { NavigationDrawerItemProps } from "./Navigation.types";
import Link from "next/link";
import { RiCheckboxCircleFill } from "react-icons/ri";

import "./Navigation.css";

export function NavigationItem({
  name,
  url,
  icon,
  items,
  type = "nav-drawer-header",
  ...props
}: NavigationDrawerItemProps): JSX.Element {
  const IconComp = typeof icon === "function" ? icon : RiCheckboxCircleFill;

  return (
    <>
      <Link href={url}>
        <a className="nav-item">
          <div className={type}>
            <IconComp className="nav-icon" />
            <span>{name}</span>
          </div>
        </a>
      </Link>
      {items &&
        items.map((item, index) => {
          return (
            <NavigationItem {...item} key={index} type="nav-drawer-item" />
          );
        })}
    </>
  );
}

export default NavigationItem;
