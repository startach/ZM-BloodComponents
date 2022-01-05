import { Meta, Story } from "@storybook/react";
import CoordinatorHeader, {
  AppHeaderProps,
  HeaderVariant,
} from "./CoordinatorHeader";

export default {
  component: CoordinatorHeader,
  title: "Components/App Header",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: AppHeaderProps = {
  hasBackButton: false,
  hasBurgerMenu: false,
  variant: HeaderVariant.SECONDARY,
};

const Template: Story<AppHeaderProps> = (args) => (
  <CoordinatorHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const SecondaryTitle = Template.bind({});
SecondaryTitle.args = {
  ...props,
  title: "כותרת",
  variant: HeaderVariant.SECONDARY,
};

export const InfoTitle = Template.bind({});
InfoTitle.args = {
  ...props,
  title: "כותרת",
  variant: HeaderVariant.INFO,
};

export const WithBack = Template.bind({});
WithBack.args = {
  ...props,
  hasBackButton: true,
};

export const WithNotification = Template.bind({});
WithNotification.args = {
  ...props,
  title: "ניהול תורים",
  variant: HeaderVariant.INFO,
  hasBackButton: true,
  hasNotificationsIcon: true,
};

export const Hamburger = Template.bind({});
Hamburger.args = {
  ...props,
  hasBurgerMenu: true,
};
