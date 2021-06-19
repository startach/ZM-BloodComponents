import { Hospital } from "@zm-blood-components/common";
import UpcomingDonationScreen, {
  UpcomingDonationScreenProps,
  UpcomingDonationStates,
} from "./UpcomingDonationScreen";
import { action } from "@storybook/addon-actions";
import { wait } from "../../__test__/DonorTestUtils";

export default {
  component: UpcomingDonationScreen,
  title: "Screens/Upcoming Donation Screen",
  parameters: { layout: "fullscreen" },
};

const props: UpcomingDonationScreenProps = {
  state: UpcomingDonationStates.beforeDonation,
  bookedAppointment: {
    bookingTimeMillis: 1628845200000,
    donationStartTimeMillis: 1628845200000,
    donorId: "donorId",
    hospital: Hospital.BEILINSON,
    id: "appointmentId",
  },
  firstName: "משה",
  onConfirm: action("onConfirm"),
  onCancel: async () => {
    action("onCancel")();
    await wait(3000);
  },
};

export const Default = () => <UpcomingDonationScreen {...props} />;
