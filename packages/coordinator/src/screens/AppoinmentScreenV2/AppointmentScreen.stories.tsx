import AppointmentScreen, { AppointmentScreenProps } from "./AppointmentScreen";
import { action } from "@storybook/addon-actions";
import { TestUtils } from "@zm-blood-components/common";
import { Meta } from "@storybook/react";

export default {
  component: AppointmentScreen,
  title: "Screens/Appointment Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const onSignInWithEmail = async (
  email: string,
  password: string,
  emailError: (error: string) => void,
  passwordError: (error: string) => void
) => {
  action("onSignInWithEmail")();
  await TestUtils.wait(3000);
  passwordError("שגיאה כלשהי");
  return false;
};

const onForgotPasswordScreen = () => {
  action("On Forgot Password!");
};

const props: AppointmentScreenProps = {
  onSignInWithEmail: onSignInWithEmail,
  onForgotPasswordClick: onForgotPasswordScreen,
};

export const Default = (args: AppointmentScreenProps) => <AppointmentScreen {...args} />;
Default.args = props;
