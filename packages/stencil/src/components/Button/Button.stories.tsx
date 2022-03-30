import { Button } from './Button';

import { h } from '@stencil/core';

export default {
  title: 'Button',
  component: Button,
};

const Template = args => {
  return <Button {...args}>buttonnnnnnnnnnnnnn</Button>;
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Warn = Template.bind({});
export const Danger = Template.bind({});
