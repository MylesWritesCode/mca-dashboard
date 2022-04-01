import { Navigation } from './Navigation';
import { h } from '@stencil/core';

export default {
  title: 'Navigation/Example',
  component: Navigation,
};

export const Example = args => {
  return <Navigation {...args} />;
};
