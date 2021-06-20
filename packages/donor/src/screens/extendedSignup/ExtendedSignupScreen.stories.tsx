import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { action } from "@storybook/addon-actions";

export default {
  component: ExtendedSignupScreen,
  title: "Screens/Extended Signup Screen",
  parameters: { layout: "fullscreen" },
};

export const Default = () => {
  return (
    <ExtendedSignupScreen
      onSave={action("onSave")}
      onSignOut={action("onSignOut")}
    />
  );
};
