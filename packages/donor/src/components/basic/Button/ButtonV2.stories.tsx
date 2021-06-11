import ButtonV2 from "./ButtonV2";
import { ButtonProps } from "./Button";

export default {
  component: ButtonV2,
  title: "COMPONENTS V2/ ButtonV2",
};

const baseArgs = {
  title: "אישור והמשך",
  onClick: () => {},

  variant: "contained",
};

export const Main = (args: ButtonProps) => <ButtonV2 {...args} />;

Main.args = {
  ...baseArgs,
};

export const SecondaryLinePink = (args: ButtonProps) => <ButtonV2 {...args} />;
SecondaryLinePink.args = {
  ...baseArgs,
  color: "secondaryPink",
  variant: "outlined",
};

export const SecondaryGray = (args: ButtonProps) => <ButtonV2 {...args} />;
SecondaryGray.args = {
  ...baseArgs,
  color: "secondaryGrey",
  variant: "outlined",
};

export const Disabled = (args: ButtonProps) => <ButtonV2 {...args} />;
Disabled.args = {
  ...baseArgs,
  isDisabled: true,
  variant: "disabled",
};

export const DefaultState = (args: ButtonProps) => <ButtonV2 {...args} />;
DefaultState.args = {
  ...baseArgs,
  color: "primary",
  variant: "outlined",
};

export const State6 = (args: ButtonProps) => <ButtonV2 {...args} />;
State6.args = {
  ...baseArgs,
  variant: "contained",
  color: "secondaryPink",
};

export const Centered = (args: ButtonProps) => <ButtonV2 {...args} />;
Centered.args = {
  ...baseArgs,
  isCentered: true,
};

export const Loading = (args: ButtonProps) => <ButtonV2 {...args} />;
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
