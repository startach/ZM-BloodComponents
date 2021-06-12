import { Story } from "@storybook/react";
import AppHeader, { AppHeaderProps } from "./AppHeader";

export default {
  component: AppHeader,
  title: "COMPONENTS V2/App Header V2",
  parameters: { layout: "fullscreen" },
};

const props: AppHeaderProps = {
  title: "כותרת",
  hasBackButton: false,
  hasBurgerMenu: false,
};

const Template: Story<AppHeaderProps> = (args) => <AppHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const WithBack = Template.bind({});
WithBack.args = {
  ...props,
  hasBackButton: true,
};

export const Hamburger = Template.bind({});
Hamburger.args = {
  ...props,
  hasBurgerMenu: true,
};
