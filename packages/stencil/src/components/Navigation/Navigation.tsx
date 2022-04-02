import { FunctionalComponent, h } from '@stencil/core';
import { NavigationItem } from './NavigationItem';
import type { NavigationProps } from './Navigation.types';

import './Navigation.css';

export const Navigation: FunctionalComponent<NavigationProps> = ({
  items,
  ...props
}) => {
  console.log(items);
  return (
    <div class="nav-drawer">
      {items.map((item, index) => {
        return <NavigationItem key={index} {...item} />;
      })}
    </div>
  );
};
