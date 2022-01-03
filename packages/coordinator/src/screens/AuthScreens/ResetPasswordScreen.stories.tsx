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

const onResetPasswordWithEmail = async (
  email: string,
  emailError: (error: string) => void
) => {
  action("onResetPasswordWithEmail")();
  await TestUtils.wait(3000);
  emailError("שגיאה כלשהי");
  return false;
};

const props: ResetPasswordScreenProps = {
  onResetPasswordWithEmail: onResetPasswordWithEmail,
};

export const Default = (args: ResetPasswordScreenProps) => (
  <ResetPasswordScreen {...args} />
);
Default.args = props;
