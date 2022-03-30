import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'm-button',
  // styleUrl: 'my-component.css',
  shadow: true,
})
export class Button {
  /**
   * The button type
   */
  @Prop() type: string;

  /**
   * The button variant
   */
  @Prop() variant: string;

  render() {
    return <button>hi</button>;
  }
}
