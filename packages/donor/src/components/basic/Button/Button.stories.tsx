import Button, { ButtonProps, ButtonVariant } from "./Button";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
  component: Button,
  title: "Components/Button",
};

const props: ButtonProps = {
  analyticsName: "approval",
  title: "לאישור לחץ כאן",
  color: "primary",
  onClick: action("onClick"),
  variant: ButtonVariant.contained,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...props,
  color: "secondary",
};

export const Default = Template.bind({});
Default.args = {
  ...props,
  color: "default",
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
  color: "default",
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
  color: "secondary",
};

export const VariantText = Template.bind({});
VariantText.args = {
  ...props,
  variant: ButtonVariant.text,
};
