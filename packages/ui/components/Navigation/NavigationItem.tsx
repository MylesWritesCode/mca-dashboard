import type { NavigationDrawerItemProps } from "./Navigation.types";

import "./Navigation.module.css";

export function NavigationItem({
  name,
  url,
  icon,
  items,
  type = "nav-header",
  ...props
}: NavigationDrawerItemProps): JSX.Element {
  return (
    <>
      <div className={`nav-item ${type}`}>
        {false && <img src={icon} alt={name} />} {name}
      </div>
      {items &&
        items.map((item, index) => {
          return <NavigationItem {...item} key={index} type="nav-sublink" />;
        })}
    </>
  );
}

export default NavigationItem;
