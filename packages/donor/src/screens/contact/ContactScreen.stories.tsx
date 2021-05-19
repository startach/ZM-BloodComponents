import ContactScreen from "./ContactScreen";

export default {
  component: ContactScreen,
  title: "Components V2/ContactScreen",
  decorators: [
    (Story: any) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

const baseArgs = {
  onClick: () => {},
};

export const Basic = (args: {}) => <ContactScreen {...args} />;
Basic.args = baseArgs;
