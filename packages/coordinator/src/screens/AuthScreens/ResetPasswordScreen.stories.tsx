import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { TestUtils } from "@zm-blood-components/common";
import ResetPasswordScreen, {
  ResetPasswordScreenProps,
} from "./ResetPasswordScreen";

export default {
  component: ResetPasswordScreen,
  title: "Screens/Reset Password Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const onResetPassword = async (
  email: string,
) => {
  action("onResetPasswordWithEmail")();
  await TestUtils.wait(500);

  if (email !== "1234") {
    throw new Error("כתבות המייל אינה תקינה");
  }
};

const props: ResetPasswordScreenProps = {
  onResetPassword: onResetPassword,
};

export const Default = (args: ResetPasswordScreenProps) => (
  <ResetPasswordScreen {...args} />
);
Default.args = props;
