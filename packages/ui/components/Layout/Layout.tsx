/**
 * This will be the base component for all layouts
 */
import { useEffect, useState } from "react";

import { NavigationDrawer } from "ui/components/Navigation";

import type { NavigationDrawerItemProps } from "../Navigation/Navigation.types";
import "./Layout.css";

interface LayoutProps {
  menuItems: NavigationDrawerItemProps[];
  children: React.ReactNode;
  contentClassName?: string;
  sx?: React.CSSProperties;
}

export default function Layout({ menuItems, children, contentClassName, sx }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.code === "KeyB" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
  });

  return (
    <div className="layout">
      <div className="page">
        <NavigationDrawer items={menuItems} isOpen={isOpen} />
        <main className={["content", contentClassName].join(" ")} style={sx}>
          {children}
        </main>
      </div>
    </div>
  );
}
