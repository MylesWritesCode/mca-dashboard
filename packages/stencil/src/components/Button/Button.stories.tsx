import { Button } from './Button';

import { h } from '@stencil/core';

export default {
  title: 'Stencil/Button',
  component: Button,
};

export const Example = () => {
  return <Button>Click me!</Button>;
};

export const OneButton = args => {
  return <Button {...args}>Click me!</Button>;
};

export const MultipleButtons = args => {
  return (
    <div>
      <Button {...args}>Click me!</Button>
      <Button {...args}>Click me!</Button>
      <Button {...args}>Click me!</Button>
      <Button {...args}>Click me!</Button>
    </div>
  );
};
