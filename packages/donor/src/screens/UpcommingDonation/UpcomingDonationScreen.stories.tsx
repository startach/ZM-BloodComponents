import { Hospital, TestUtils } from "@zm-blood-components/common";
import UpcomingDonationScreen, {
  UpcomingDonationScreenProps,
} from "./UpcomingDonationScreen";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
  component: UpcomingDonationScreen,
  title: "Screens/Upcoming Donation Screen",
  parameters: { layout: "fullscreen" },
};

const props: UpcomingDonationScreenProps = {
  bookedAppointment: {
    bookingTimeMillis: 1628845200000,
    donationStartTimeMillis: 1628845200000,
    donorId: "donorId",
    hospital: Hospital.BEILINSON,
    id: "appointmentId",
  },
  fullName: "משה כהן",
  onCancel: async () => {
    action("onCancel")();
    await TestUtils.wait(3000);
  },
};

const Template: Story<UpcomingDonationScreenProps> = (args) => (
  <UpcomingDonationScreen {...args} />
);

export const Default = Template.bind({});
Default.args = props;
