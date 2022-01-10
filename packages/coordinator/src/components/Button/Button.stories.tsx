import Button, { ButtonColor, ButtonProps, ButtonVariant } from "./Button";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

export default {
  component: Button,
  title: "Components/Button",
  parameters: { layout: "padded" },
} as Meta;

const props: ButtonProps = {
  title: "לאישור לחץ כאן",
  onClick: action("onClick"),
  variant: ButtonVariant.contained,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const DefaultColor = Template.bind({});
DefaultColor.args = {
  ...props,
};

export const Primary = Template.bind({});
Primary.args = {
  ...props,
  color: ButtonColor.primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...props,
  color: ButtonColor.secondary,
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...props,
  variant: ButtonVariant.outlined,
};

export const Text = Template.bind({});
Text.args = {
  ...props,
  variant: ButtonVariant.text,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...props,
  isDisabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...props,
  isLoading: true,
};
