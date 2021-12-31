import CoordinatorSignInScreen, {
  SignInScreenProps,
} from "./CoordinatorSignInScreen";
import { action } from "@storybook/addon-actions";
import { TestUtils } from "@zm-blood-components/common";
import { Meta } from "@storybook/react";

export default {
  component: CoordinatorSignInScreen,
  title: "Screens (OLD)/Sign In Screen",
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

const props: SignInScreenProps = {
  onSignInWithEmail: onSignInWithEmail,
};

export const Default = (args: SignInScreenProps) => (
  <CoordinatorSignInScreen {...args} />
);
Default.args = props;
