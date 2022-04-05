import type { HeaderProps } from "./Header.types";

import "./Header.css";

export function Header({ ...props }: HeaderProps): JSX.Element {
  return (
    <div className="nav-header">
      This is the header
    </div>
  );
}

export default Header;
