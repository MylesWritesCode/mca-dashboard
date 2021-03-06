import { ComponentMeta, ComponentStory } from "@storybook/react";
import CardComponent from "./Card";

export default {
  title: "React/Card",
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

const Composition = () => {
  const style: React.CSSProperties = {
    // height: "100%",
    // width: "150px",
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

export const Example: ComponentStory<typeof CardComponent> = args => {
  const styles: React.CSSProperties = {
    display: "grid",
    gridTemplateRows: "repeat(2, 250px)",
    gridTemplateColumns: "repeat(2, 250px)",
    justifyItems: "center",
    alignItems: "center",
    gap: "1rem",
  };

  return (
    <div style={styles}>
      <CardComponent {...args}>
        <Composition />
      </CardComponent>
      <CardComponent {...args}>
        <CardComponent.Header title="Card header" />
        <Composition />
      </CardComponent>
      <CardComponent {...args}>
        <Composition />
        <CardComponent.Footer title="Card footer" />
      </CardComponent>
      <CardComponent {...args}>
        <CardComponent.Header title="Card header" />
        <Composition />
        <CardComponent.Footer title="Card footer" />
      </CardComponent>
    </div>
  );
};

export const Basic: ComponentStory<typeof CardComponent> = args => {
  return (
    <CardComponent {...args}>
      <Composition />
    </CardComponent>
  );
};

export const WithHeader: ComponentStory<typeof CardComponent> = args => {
  return (
    <CardComponent {...args}>
      <CardComponent.Header title="Card header" />
      <Composition />
    </CardComponent>
  );
};

export const WithFooter: ComponentStory<typeof CardComponent> = args => {
  return (
    <CardComponent {...args}>
      <Composition />
    </CardComponent>
  );
};

export const WithHeaderAndFooter: ComponentStory<
  typeof CardComponent
> = args => {
  return (
    <CardComponent {...args}>
      <Composition />
    </CardComponent>
  );
};
