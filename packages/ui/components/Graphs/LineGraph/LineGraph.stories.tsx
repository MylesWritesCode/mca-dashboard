import { ComponentMeta, ComponentStory } from "@storybook/react";
import LineGraphComponent from "./LineGraph";

export default {
  title: "React/LineGraph",
  component: LineGraphComponent,
} as ComponentMeta<typeof LineGraphComponent>;

export const LineGraph: ComponentStory<typeof LineGraphComponent> = args => {
  const styles: React.CSSProperties = {
    display: "grid",
    gridTemplateRows: "repeat(2, 250px)",
    gridTemplateColumns: "repeat(2, 250px)",
    justifyItems: "center",
    alignItems: "center",
    gap: "1rem",
  };

  return <LineGraphComponent />;
};
