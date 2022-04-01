import { FunctionalComponent, h } from '@stencil/core';
import type { ButtonProps } from './Button.types';

export const Button: FunctionalComponent<ButtonProps> = ({
  variant = 'primary',
  ...props
}) => {
  let { children, className, ...rest } = props;

  if (className) {
    className = `${className} btn-${variant}`;
  } else {
    className = `btn-${variant}`;
  }

  return (
    <button class={className} {...rest}>
      {props.children}
    </button>
  );
};
