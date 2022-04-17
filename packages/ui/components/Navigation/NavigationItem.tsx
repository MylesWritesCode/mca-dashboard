import { NavigationDrawerItemProps } from "./Navigation.types";
import Link from "next/link";

import "./Navigation.css";

export function NavigationItem({
  name,
  url,
  icon,
  items,
  type = "nav-drawer-header",
  ...props
}: NavigationDrawerItemProps): JSX.Element {
  const IconComp = typeof icon === "function" ? icon : null;

  return (
    <>
      <Link href={url}>
        <a>
          <div className={`nav-item ${type}`}>
            {IconComp && <IconComp className="nav-icon" />}
            {name}
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
