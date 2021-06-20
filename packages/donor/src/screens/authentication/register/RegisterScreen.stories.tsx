import RegisterScreen, { RegisterScreenProps } from "./RegisterScreen";
import { action } from "@storybook/addon-actions";

export default {
  component: RegisterScreen,
  title: "Screens/Authentication/Register Screen",
  parameters: { layout: "fullscreen" },
};

const props: RegisterScreenProps = {
  onRegister: action("onRegister"),
  goToSignIn: action("goToSignIn"),
};

export const Default = (args: RegisterScreenProps) => (
  <RegisterScreen {...args} />
);
Default.args = props;
