import Button, { ButtonProps, ButtonVariant } from "./Button";
import { Story } from "@storybook/react";
import WithGlobalTheme from "../../../HOCs/withGlobalTheme";
import { Star, Mail } from "@material-ui/icons";

export default {
  component: Button,
  title: "Button",
};

const Template: Story<ButtonProps> = (args) => (
  <WithGlobalTheme>
    <Button {...args} />
  </WithGlobalTheme>
);

export const Default = Template.bind({} as ButtonProps);
Default.args = {
  title: "כפתור",
  variant: ButtonVariant.contained,
  onClick: () => {},
};

export const TextVariant = Template.bind({} as ButtonProps);
TextVariant.args = {
  ...Default.args,
  variant: ButtonVariant.text,
};

export const Outlinedariant = Template.bind({} as ButtonProps);
Outlinedariant.args = {
  ...Default.args,
  variant: ButtonVariant.outlined,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...Default.args,
  variant: ButtonVariant.contained,
  startIcon: <Star />,
  endIcon: <Mail />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  isDisabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  isFullWidth: true,
};

export const Centered = Template.bind({});
Centered.args = {
  ...Default.args,
  isCentered: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};
