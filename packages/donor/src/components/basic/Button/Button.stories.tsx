import Button, { ButtonProps, ButtonVariant } from "./Button";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { Color } from "../../../constants/colors";

export default {
  component: Button,
  title: "Components/Button",
};

const props: ButtonProps = {
  analytics: false,
  title: "לאישור לחץ כאן",
  onClick: action("onClick"),
  variant: ButtonVariant.contained,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
  color: Color.Primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...props,
  color: Color.Secondary,
};

export const Default = Template.bind({});
Default.args = {
  ...props,
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
  color: Color.Secondary,
};

export const VariantText = Template.bind({});
VariantText.args = {
  ...props,
  variant: ButtonVariant.text,
};
