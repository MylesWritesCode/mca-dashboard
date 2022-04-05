/**
 * Layout
 *
 * This will be the base component for all layouts
 */

import { NavigationDrawer } from "ui/components/Navigation";
import type { NavigationDrawerItemProps } from "../Navigation/Navigation.types";

interface LayoutProps {
  menuItems: NavigationDrawerItemProps[];
  children: React.ReactNode;
}

export default function Layout({ menuItems, children }: LayoutProps) {
  return (
    <>
      {/* should probably have a header */}
      <div>
        <NavigationDrawer items={menuItems} />
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
