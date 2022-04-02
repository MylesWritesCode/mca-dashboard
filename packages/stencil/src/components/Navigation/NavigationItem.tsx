import { Fragment, FunctionalComponent, h, Host } from '@stencil/core';
import type { NavigationItemProps } from './Navigation.types';

export const NavigationItem: FunctionalComponent<NavigationItemProps> = ({
  name,
  url,
  icon,
  items,
  type = 'nav-header',
  ...props
}) => {
  return (
    <div>
      <div class={`${type} nav-item`} {...props}>
        {icon && <i class={`${icon}`}></i>}
        <h3>{name}</h3>
      </div>
      {items &&
        items.map((item, index) => {
          return <NavigationItem type="nav-sublink" key={index} {...item} />;
        })}
    </div>
  );
};
