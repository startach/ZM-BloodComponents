import ResetPasswordScreen, {ResetPasswordScreenProps} from "./ResetPasswordScreen";
import {action} from "@storybook/addon-actions";

export default {
  component: ResetPasswordScreen,
  title: "Screens/Reset Password Screen",
  parameters: { layout: "fullscreen" },
};

const props: ResetPasswordScreenProps = {
  onResetPassword: action("onResetPassword"),
  goToSignIn: action("goToSignIn"),
};

export const Default = (args: ResetPasswordScreenProps) => <ResetPasswordScreen {...args} />;
Default.args = props;
