import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MButton as Button } from 'ui';

import { h } from '@stencil/core';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = () => {
  return <Button>buttonnnnnnnnnnnnnn</Button>;
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Warn = Template.bind({});
export const Danger = Template.bind({});