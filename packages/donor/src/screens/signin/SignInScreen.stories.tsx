import SignInScreen, { SignInScreenProps } from "./SignInScreen";
import { action } from "@storybook/addon-actions";
import { wait } from "../../__test__/DonorTestUtils";

export default {
  component: SignInScreen,
  title: "Screens/Authentication/Sign In Screen",
  parameters: { layout: "fullscreen" },
};

const onSignInWithEmail = async (
  email: string,
  password: string,
  emailError: (error: string) => void,
  passwordError: (error: string) => void
) => {
  action("onSignInWithEmail")();
  await wait(3000);
  passwordError("שגיאה כלשהי");
  return false;
};

const props: SignInScreenProps = {
  onRegister: action("onRegister"),
  onResetPassword: action("onResetPassword"),
  onSignInWithEmail: onSignInWithEmail,
};

export const Default = (args: SignInScreenProps) => <SignInScreen {...args} />;
Default.args = props;
