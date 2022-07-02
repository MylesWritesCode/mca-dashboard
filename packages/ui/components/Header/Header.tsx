import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { SearchPrompt } from "ui/components/SearchPrompt";

import "./Header.scss";
import type { HeaderProps } from "./Header.types";

export function Header({ brand = "BRAND", logo, links }: HeaderProps): JSX.Element {
  const { data: session } = useSession();

  return (
    <div className="nav-header">
      <div className="left">
        <Link href="/" passHref={true}>
          <div className="nav-brand">
            {logo ? <img className="nav__brand_logo" src={logo} alt={`${brand} logo`} /> : <h1>{brand}</h1>}
          </div>
        </Link>
        <div className="inline-search">
          <SearchPrompt />
        </div>
      </div>
      <div className="right">
        <div className="nav-settings">
          {links?.map(({ icon: Icon, link, action }, i) => (
            <a key={i} href={link} className="cursor-pointer hover:bg-[#00000022] hover:rounded-md" onClick={action}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
