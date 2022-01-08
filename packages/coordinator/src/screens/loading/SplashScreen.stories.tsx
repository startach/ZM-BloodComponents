import SplashScreen from "./SplashScreen";
import { Meta } from "@storybook/react";

export default {
  component: SplashScreen,
  title: "Screens/Splash Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default = () => <SplashScreen />;
