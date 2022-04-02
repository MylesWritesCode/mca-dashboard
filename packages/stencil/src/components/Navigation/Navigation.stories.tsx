import { Navigation } from './Navigation';
import { h } from '@stencil/core';
import { items } from './Navigation.stories.config';

export default {
  title: 'Navigation/Example',
  component: Navigation,
};

const Template = args => {
  return <Navigation {...args} />;
};

export const Example = Template.bind({});
Example.args = {
  items,
};

