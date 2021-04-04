import Button, { ButtonProps, ButtonVariant } from "./Button";
import { Mail, Star } from "@material-ui/icons";
import { MuiTestWrapper } from "../../../__test__/TestUtils";

export default {
  component: Button,
  title: "Button",
};

const baseArgs = {
  title: "כפתור",
  variant: ButtonVariant.contained,
  onClick: () => {},
};

export const Basic = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);

Basic.args = baseArgs;

export const TextVariant = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
TextVariant.args = {
  ...baseArgs,
  variant: ButtonVariant.text,
};

export const OutlinedVariant = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
OutlinedVariant.args = {
  ...baseArgs,
  variant: ButtonVariant.outlined,
};

export const WithIcons = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
WithIcons.args = {
  ...baseArgs,
  variant: ButtonVariant.contained,
  startIcon: <Star />,
  endIcon: <Mail />,
};

export const Disabled = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
Disabled.args = {
  ...baseArgs,
  isDisabled: true,
};

export const FullWidth = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
FullWidth.args = {
  ...baseArgs,
  isFullWidth: true,
};

export const Centered = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
Centered.args = {
  ...baseArgs,
  isCentered: true,
};

export const Loading = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
