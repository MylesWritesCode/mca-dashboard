/**
 * This will be the base component for all layouts
 */

import { useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
  });

  return (
    <div className="layout">
      <Header logo="/logo.png" />
      <div className="page">
        <NavigationDrawer items={menuItems} isOpen={isOpen} />
        <main className="content" style={sx}>
          {children}
        </main>
      </div>
    </div>
  );
}
