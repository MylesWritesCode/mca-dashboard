import { FunctionalComponent, h } from '@stencil/core';
import type { ButtonProps } from './Button.types';

export const Button: FunctionalComponent<ButtonProps> = ({ 
  variant = "primary", 
  ...props 
}) => {
  function handleClick(e: Event) {
    console.log('clicked');
  }

  return (
    <button onClick={handleClick}>
      { props.children }
    </button>
  );
};
