/**
 * Layout
 *
 * This will be the base component for all layouts
 */

import { NavigationDrawer } from "ui/components/Navigation";
import { Header } from "ui/components/Header";
import type { NavigationDrawerItemProps } from "../Navigation/Navigation.types";

import "./Layout.css";

interface LayoutProps {
  menuItems: NavigationDrawerItemProps[];
  children: React.ReactNode;
  sx?: React.CSSProperties;
}

export default function Layout({ menuItems, children, sx }: LayoutProps) {
  return (
    <div className="layout">
      <Header logo="/logo.png" />
      <div className="page">
        <NavigationDrawer items={menuItems} />
        <main className="content" style={sx}>{children}</main>
      </div>
    </div>
  );
}
