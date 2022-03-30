import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mca-button',
  // styleUrl: 'my-component.css',
  shadow: true,
})
export class Button {
  @Prop() text: string;

  render() {
    return (
      <button>
        {this.text}
      </button>
    );
  }
}
