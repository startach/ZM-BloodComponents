import ContactScreen from "./ContactScreen";

export default {
  component: ContactScreen,
  title: "Screens/Contact Screen",
  parameters: { layout: "fullscreen" },
};

export const Default = (args: {}) => <ContactScreen {...args} />;
