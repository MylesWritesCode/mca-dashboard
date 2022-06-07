import type { NavigationDrawerProps } from "./Navigation.types";
import NavigationItem from "./NavigationItem";
import { UserCard } from "./UserCard";

import "./Navigation.css";

export function NavigationDrawer({
  items,
  isOpen = true,
  ...props
}: NavigationDrawerProps): JSX.Element {
  return (
    <div className={`nav-drawer ${isOpen ? "open" : "close"}`}>
      <div className="flex h-full flex-col items-center">
        {items.map((item, index) => {
          return <NavigationItem {...item} isOpen={isOpen} key={index} />;
        })}
      </div>
      <div>
        <UserCard
          isOpen={isOpen}
          user={{
            name: "",
            avatarSrc: "",
          }}
        />
      </div>
    </div>
  );
}

export default NavigationDrawer;
