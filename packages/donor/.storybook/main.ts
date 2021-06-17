module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],
  typescript: {
    reactDocgen: "none",
  },

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
};
