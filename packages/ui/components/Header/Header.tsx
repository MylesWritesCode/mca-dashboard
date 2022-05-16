import type { HeaderProps } from "./Header.types";

import "./Header.css";

export function Header({ brand, ...props }: HeaderProps): JSX.Element {
  return (
    <div className="nav-header">
      <div className="left">
        <div className="nav-brand">
          <h1>{brand}</h1>
        </div>
        <div className="inline-search">todo: inline-search</div>
      </div>
      <div className="right">
        <div className="nav-settings">todo: nav-settings</div>
      </div>
    </div>
  );
}

export default Header;
