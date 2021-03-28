import Button, { ButtonProps, ButtonVariant } from "./Button";
import { Mail, Star } from "@material-ui/icons";

export default {
  component: Button,
  title: "Button",
};

const baseArgs = {
  title: "כפתור",
  onClick: () => {},
};

export const Basic = (args: ButtonProps) => <Button {...args} />;
Basic.args = baseArgs;

export const TextVariant = (args: ButtonProps) => <Button {...args} />;
TextVariant.args = {
  ...baseArgs,
  variant: ButtonVariant.text,
};

export const OutlinedVariant = (args: ButtonProps) => <Button {...args} />;
OutlinedVariant.args = {
  ...baseArgs,
  variant: ButtonVariant.outlined,
};

export const WithIcons = (args: ButtonProps) => <Button {...args} />;
WithIcons.args = {
  ...baseArgs,
  variant: ButtonVariant.contained,
  startIcon: <Star />,
  endIcon: <Mail />,
};

export const Disabled = (args: ButtonProps) => <Button {...args} />;
Disabled.args = {
  ...baseArgs,
  isDisabled: true,
};

export const FullWidth = (args: ButtonProps) => <Button {...args} />;
FullWidth.args = {
  ...baseArgs,
  isFullWidth: true,
};

export const Centered = (args: ButtonProps) => <Button {...args} />;
Centered.args = {
  ...baseArgs,
  isCentered: true,
};

export const Loading = (args: ButtonProps) => <Button {...args} />;
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
