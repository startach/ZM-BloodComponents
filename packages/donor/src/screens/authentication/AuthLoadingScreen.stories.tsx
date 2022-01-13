import AuthLoadingScreen from "./AuthLoadingScreen";
import { Meta } from "@storybook/react";

export default {
  component: AuthLoadingScreen,
  title: "Screens/Splash Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default = () => <AuthLoadingScreen />;
