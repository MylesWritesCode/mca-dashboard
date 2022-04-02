import { ComponentMeta, ComponentStory } from "@storybook/react";
import ButtonComponent from "./Button";

export default {
  title: "React/Button",
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => {
  return <ButtonComponent {...args}>Button</ButtonComponent>;
};

export const Button = Template.bind({});
