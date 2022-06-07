import { NavigationDrawerItemProps } from "./Navigation.types";
import Link from "next/link";
import { RiCheckboxCircleFill } from "react-icons/ri";

import "./Navigation.css";

export function NavigationItem({
  name,
  url,
  icon,
  items,
  isOpen,
  type = "nav-drawer-header",
}: NavigationDrawerItemProps): JSX.Element {
  const IconComp = typeof icon === "function" ? icon : RiCheckboxCircleFill;

  return (
    <>
      <Link href={url}>
        <a className="nav-item">
          <div className={type}>
            <IconComp className="nav-icon" />
            <span className="nav-text">{name}</span>
          </div>
        </a>
      </Link>
      {items &&
        items.map((item, index) => {
          return (
            isOpen && (
              <NavigationItem
                {...item}
                key={index}
                isOpen={isOpen}
                type="nav-drawer-item"
              />
            )
          );
        })}
    </>
  );
}

export default NavigationItem;
