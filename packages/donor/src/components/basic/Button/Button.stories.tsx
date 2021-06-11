import Button, { ButtonProps, ButtonVariant } from "./Button";
import { Mail, Star } from "@material-ui/icons";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  component: Button,
  title: "Components V1/Button",
};

const baseArgs = {
  title: "כפתור",
  variant: ButtonVariant.contained,
  onClick: action("onClick"),
};

export const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Basic = Template.bind({});
Basic.args = baseArgs;

export const TextVariant = Template.bind({});
TextVariant.args = {
  ...baseArgs,
  variant: ButtonVariant.text,
};

export const OutlinedVariant = Template.bind({});
OutlinedVariant.args = {
  ...baseArgs,
  variant: ButtonVariant.outlined,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...baseArgs,
  variant: ButtonVariant.contained,
  startIcon: <Star />,
  endIcon: <Mail />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...baseArgs,
  isDisabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...baseArgs,
  isFullWidth: true,
};

export const Centered = Template.bind({});
Centered.args = {
  ...baseArgs,
  isCentered: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
