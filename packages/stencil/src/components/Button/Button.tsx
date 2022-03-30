import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'm-button',
  // styleUrl: 'my-component.css',
  shadow: false,
  scoped: false,
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

  private handleClick = () => {
    console.log('clicked!');
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        <slot />
      </button>
    );
  }
}
