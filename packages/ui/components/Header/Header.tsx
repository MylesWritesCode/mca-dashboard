import Link from "next/link";
import { SearchPrompt } from "ui/components/SearchPrompt";

import type { HeaderProps } from "./Header.types";
import { APP_CONFIG } from "config";

import "./Header.css";

const LINKS = APP_CONFIG.header.resourceLinks;

export function Header({ brand }: HeaderProps): JSX.Element {
  return (
    <div className="nav-header">
      <div className="left">
        <Link href="/" passHref={true}>
          <div className="nav-brand">
            <h1>{brand}</h1>
          </div>
        </Link>
        <div className="inline-search">
          <SearchPrompt />
        </div>
      </div>
      <div className="right">
        <div className="nav-settings">
          {LINKS.map(({ icon: Icon, link }, i) => (
            <a key={i} href={link} target="_blank">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
