import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavigationDrawer as NavDrawer } from "./NavigationDrawer";

import { items } from './NavigationDrawer.stories.config';

export default {
  title: "React/Navigation/Navigation Drawer",
  component: NavDrawer,
} as ComponentMeta<typeof NavDrawer>;

const Template: ComponentStory<typeof NavDrawer> = (args) => {
  return <NavDrawer {...args} />;
};

export const NavigationDrawer = Template.bind({});
NavigationDrawer.args = {
  items: items,
}