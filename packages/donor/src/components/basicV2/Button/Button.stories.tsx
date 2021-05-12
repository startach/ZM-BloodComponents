import Button, { ButtonProps } from "./Button";

export default {
  component: Button,
  title: "COMPONENTS V2/ Button",
};

const baseArgs = {
  title: "אישור והמשך",
  onClick: () => {},
  
  variant: 'contained',
};

export const Main = (args: ButtonProps) => (
    <Button {...args} />
);

Main.args = {
  ...baseArgs,
};

export const SecondaryLinePink = (args: ButtonProps) => (
    <Button {...args} />
);
SecondaryLinePink.args = {
  ...baseArgs,
  color: "secondaryPink",
  variant: 'outlined',
};

export const SecondaryGray = (args: ButtonProps) => (
    <Button {...args} />
);
SecondaryGray.args = {
  ...baseArgs,
  color: "secondaryGrey",
  variant: "outlined"
};

export const Disabled = (args: ButtonProps) => (
    <Button {...args} />
);
Disabled.args = {
  ...baseArgs,
  isDisabled: true,
  variant:'disabled'
};

export const DefaultState = (args: ButtonProps) => (
    <Button {...args} />
);
DefaultState.args = {
  ...baseArgs,
  color: "primary",
  variant:"outlined"
};

export const State6 = (args: ButtonProps) => (
    <Button {...args} />
);
State6.args = {
  ...baseArgs,
variant:"contained",
color: "secondaryPink"
};

export const Centered = (args: ButtonProps) => (
  
    <Button {...args} />
);
Centered.args = {
  ...baseArgs,
  isCentered: true,
};

export const Loading = (args: ButtonProps) => (
    <Button {...args} />
);
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
