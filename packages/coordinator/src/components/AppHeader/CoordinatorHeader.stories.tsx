import { Story } from "@storybook/react";
import CoordinatorHeader, { AppHeaderProps } from "./CoordinatorHeader";
import { action } from "@storybook/addon-actions";

export default {
  component: CoordinatorHeader,
  title: "Components/App Header",
  parameters: { layout: "fullscreen" },
};

const props: AppHeaderProps = {
  hasBackButton: false,
  hasBurgerMenu: false,
  onSignOut: action("onSignOut"),
};

const Template: Story<AppHeaderProps> = (args) => (
  <CoordinatorHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const WithText = Template.bind({});
WithText.args = {
  ...props,
  title: "כותרת",
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
