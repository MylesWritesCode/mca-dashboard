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
}

export function Layout({ menuItems, children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="page">
        <NavigationDrawer items={menuItems} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export function getLayout(page: React.ReactNode) {
  return (
    <Layout menuItems={[]}>
      {page}
    </Layout>
  );
}

export default Layout;