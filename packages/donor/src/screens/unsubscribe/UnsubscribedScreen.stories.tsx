import UnsubscribedScreen from "./UnsubscribedScreen";
import { MemoryRouter } from "react-router-dom";
import { Story } from "@storybook/react";
import { UnsubscribedScreenProps } from "./UnsubscribedScreen";
import { mockUser } from "../../utils/StorybookMocks";

export default {
  component: UnsubscribedScreen,
  title: "Screens/Unsubscribed",
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const loggedInProps: UnsubscribedScreenProps = {
  isLoggedIn: true,
  user: mockUser,
};

const noUserProps: UnsubscribedScreenProps = {
  isLoggedIn: false,
  user: undefined,
};
const Template: Story<UnsubscribedScreenProps> = (args) => (
  <UnsubscribedScreen {...args} />
);

export const UserLoggedIn = Template.bind({});
UserLoggedIn.args = loggedInProps;

export const NoUser = Template.bind({});
NoUser.args = noUserProps;
