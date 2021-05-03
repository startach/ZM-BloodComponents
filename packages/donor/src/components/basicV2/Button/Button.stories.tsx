import Button, { ButtonProps } from "./Button";

export default {
  component: Button,
  title: "COMPONENTS V2/ Button",
};

const baseArgs = {
  title: "אישור והמשך",
  onClick: () => {},
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
  color: "#CB007B",
  backgroundColor: "#fff",
  border: "1px #CB007B solid",
};

export const SecondaryGray = (args: ButtonProps) => (
    <Button {...args} />
);
SecondaryGray.args = {
  ...baseArgs,
  color: "#707070",
  backgroundColor: "#fff",
  border: "1px #9CB2BD80 solid",
};

export const Disabled = (args: ButtonProps) => (
    <Button {...args} />
);
Disabled.args = {
  ...baseArgs,
  color: "#cbcdcf",
  backgroundColor: "#E7ECEF80",
  isDisabled: true,
};

export const DefaultState = (args: ButtonProps) => (
    <Button {...args} />
);
DefaultState.args = {
  ...baseArgs,
  color: "#4CAF50",
  backgroundColor: "#fff",
  border: "1px solid #4CAF51",
};

export const State6 = (args: ButtonProps) => (
    <Button {...args} />
);
State6.args = {
  ...baseArgs,
  color: "#fff",
  backgroundColor: "#CB007B",
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
