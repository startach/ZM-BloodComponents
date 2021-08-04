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

const props: (hospital: Hospital) => UpcomingDonationScreenProps = (
  hospital
) => ({
  bookedAppointment: {
    bookingTimeMillis: 1628845200000,
    donationStartTimeMillis: 1628845200000,
    donorId: "donorId",
    hospital: hospital,
    id: "appointmentId",
  },
  fullName: "משה כהן",
  onCancel: async () => {
    action("onCancel")();
    await TestUtils.wait(3000);
  },
});

const Template: Story<UpcomingDonationScreenProps> = (args) => (
  <UpcomingDonationScreen {...args} />
);

export const Beilinson = Template.bind({});
Beilinson.args = props(Hospital.BEILINSON);

export const Ichilov = Template.bind({});
Ichilov.args = props(Hospital.ICHILOV);

export const Soroka = Template.bind({});
Soroka.args = props(Hospital.SOROKA);

export const Default = Template.bind({});
Default.args = props(Hospital.TEL_HASHOMER);
