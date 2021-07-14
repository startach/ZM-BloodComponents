import DonationProcessScreen, {
  DonationProcessScreenProps,
} from "./DonationProcessScreen";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
  component: DonationProcessScreen,
  title: "Screens/Donation Process Screen",
  parameters: { layout: "fullscreen" },
};

const props: DonationProcessScreenProps = {
  onContact: action("onContact"),
};

const Template: Story<DonationProcessScreenProps> = (args) => (
  <DonationProcessScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
