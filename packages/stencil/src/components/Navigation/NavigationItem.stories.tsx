import { NavigationItem } from './NavigationItem';

import { h } from '@stencil/core';

export default {
  title: 'Navigation/NavigationItem',
  component: NavigationItem,
};

export const Example = () => {
  return <NavigationItem>Click me!</NavigationItem>;
};

export const OneItem = args => {
  return <NavigationItem {...args}>Click me!</NavigationItem>;
};

export const MultipleItems = args => {
  return (
    <div>
      <NavigationItem {...args}>Click me!</NavigationItem>
      <NavigationItem {...args}>Click me!</NavigationItem>
      <NavigationItem {...args}>Click me!</NavigationItem>
      <NavigationItem {...args}>Click me!</NavigationItem>
    </div>
  );
};
