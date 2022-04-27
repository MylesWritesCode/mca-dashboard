import { ComponentMeta, ComponentStory } from "@storybook/react";
import HeaderComponent from "./Header";

export default {
  title: "React/Navigation/Header",
  component: HeaderComponent,
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = args => {
  return <HeaderComponent {...args} />;
};

export const Header = Template.bind({});
