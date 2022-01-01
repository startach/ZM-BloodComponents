import LoadingScreen from "./LoadingScreen";
import { Meta } from "@storybook/react";

export default {
  component: LoadingScreen,
  title: "Screens (OLD)/Loading Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default = () => <LoadingScreen />;
