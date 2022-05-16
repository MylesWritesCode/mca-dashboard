import type { NavigationDrawerProps } from "./Navigation.types";
import NavigationItem from "./NavigationItem";
import { UserCard } from "./UserCard";

import "./Navigation.css";

export function NavigationDrawer({
  items,
  ...props
}: NavigationDrawerProps): JSX.Element {
  return (
    <div className="nav-drawer">
      <div className="nav-drawer-items">
        {items.map((item, index) => {
          return <NavigationItem {...item} key={index} />;
        })}
      </div>
      <div className="nav-drawer-user">
        <UserCard user={{
          name: "",
          avatarSrc: ""
        }} />
      </div>
    </div>
  );
}

export default NavigationDrawer;
