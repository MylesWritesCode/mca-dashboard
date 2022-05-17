import type { HeaderProps } from "./Header.types";
import { APP_CONFIG } from "config";

import "./Header.css";

const LINKS = APP_CONFIG.header.resourceLinks;

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
        <div className="nav-settings">
          {LINKS.map(({ icon: Icon, link }) => (
            <a target="_blank" href={link}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
