import type { StorybookConfig } from "@storybook/core-common";

const config: StorybookConfig = {
  stories: ["../packages/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};

module.exports = config;
