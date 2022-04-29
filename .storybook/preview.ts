import { type Parameters } from "@storybook/react";
import "../packages/ui/styles/globals.css";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "default",
    values: [
      {
        name: "default",
        value: "#e5e9f0",
      },
      {
        name: "light",
        value: "#e5e9f0",
      },
      {
        name: "dark",
        value: "#4c4a48",
      },
      {
        name: "white",
        value: "#ffffff",
      },
      {
        name: "black",
        value: "#000000",
      },
    ],
  },
  options: {
    storySort: {
      order: [
        "WIP",
        "Navigation",
        "Card",
        [
          "Example",
          "Basic",
          "With Header",
          "With Footer",
          "With Header and Footer",
        ],
        "Button",
      ],
      locales: "",
    },
  },
};
