import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { Hospital } from "@zm-blood-components/common";
import DonationApproveScreen, {
  DonationApproveScreenProps,
} from "./DonationApproveScreen";

export default {
  component: DonationApproveScreen,
  title: "Screens/Approve Screen",
  argTypes: {
    firstName: { type: "string", defaultValue: "משה" },
  },
};

const Template: Story<DonationApproveScreenProps> = (args) => (
  <DonationApproveScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  firstName: "משה",
  hospital: Hospital.HADASA_EIN_KEREM,
  donationStartTimeMillis: 946677600000,
  onShowOptionSelected: action("onShowOptionSelected"),
};
