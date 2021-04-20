import Button, { ButtonProps } from "./Button";
import { MuiTestWrapper } from "../../../__test__/TestUtils";

export default {
  component: Button,
  title: "Buttonv2",
};

const baseArgs = {
  title: "אישור והמשך",
  onClick: () => {},
};

export const Main = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);

Main.args = {
  ...baseArgs,
};

export const SecondaryLinePink = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
SecondaryLinePink.args = {
  ...baseArgs,
  color: "#CB007B",
  backgroundColor: "#fff",
  border: "1px #CB007B solid",
};

export const SecondaryGray = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
SecondaryGray.args = {
  ...baseArgs,
  color: "#707070",
  backgroundColor: "#fff",
  border: "1px #9CB2BD80 solid",
};

export const Disabled = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
Disabled.args = {
  ...baseArgs,
  color: "#cbcdcf",
  backgroundColor: "#E7ECEF80",
  isDisabled: true,
};

export const DefaultState = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
DefaultState.args = {
  ...baseArgs,
  color: "#4CAF50",
  backgroundColor: "#fff",
  border: "1px solid #4CAF51",
};

export const State6 = (args: ButtonProps) => (
  <MuiTestWrapper>
    <Button {...args} />
  </MuiTestWrapper>
);
State6.args = {
  ...baseArgs,
  color: "#fff",
  backgroundColor: "#CB007B",
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
