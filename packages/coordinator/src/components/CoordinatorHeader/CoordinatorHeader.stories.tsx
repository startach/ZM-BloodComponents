import { Meta, Story } from "@storybook/react";
import CoordinatorHeader, {
  CoordinatorHeaderProps,
  HeaderVariant,
} from "./CoordinatorHeader";

export default {
  component: CoordinatorHeader,
  title: "Components/App Header",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: CoordinatorHeaderProps = {
  hasBackButton: false,
  hasBurgerMenu: false,
  variant: HeaderVariant.SECONDARY,
};

const Template: Story<CoordinatorHeaderProps> = (args) => (
  <div style={{ height: "100%", width: "100%", backgroundColor: "lightcyan" }}>
    <CoordinatorHeader {...args} />
  </div>
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

export const StickyComponent = Template.bind({});
StickyComponent.args = {
  ...props,
  title: "ניהול תורים",
  variant: HeaderVariant.INFO,
  hasBackButton: true,
  hasNotificationsIcon: true,
  stickyComponent: <div style={{ padding: 10 }}>משהו דביק</div>,
};

export const Hamburger = Template.bind({});
Hamburger.args = {
  ...props,
  hasBurgerMenu: true,
};
