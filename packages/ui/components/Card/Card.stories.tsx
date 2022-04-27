import { ComponentMeta, ComponentStory } from "@storybook/react";
import CardComponent from "./Card";

export default {
  title: "React/Card",
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

const Composition = () => {
  const style: React.CSSProperties = {
    background: "rgba(0, 0, 0, 0.5)",
    height: "200px",
    width: "200px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <div>This is some data.</div>
    </div>
  );
};

const Template: ComponentStory<typeof CardComponent> = args => {
  return (
    <CardComponent {...args}>
      <Composition />
    </CardComponent>
  );
};

export const Card = Template.bind({});
