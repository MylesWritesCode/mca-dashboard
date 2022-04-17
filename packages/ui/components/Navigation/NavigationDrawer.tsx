import type { NavigationDrawerProps } from "./Navigation.types";
import NavigationItem from "./NavigationItem";

import './Navigation.css';

export function NavigationDrawer({
  items,
  ...props
}: NavigationDrawerProps): JSX.Element {
  return (
    <div className="nav-drawer">
      {items.map((item, index) => {
        return <NavigationItem {...item} key={index} />;
      })}
    </div>
  );
}

export default NavigationDrawer;
