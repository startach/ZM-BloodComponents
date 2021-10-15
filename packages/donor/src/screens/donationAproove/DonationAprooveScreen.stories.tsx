import DonationAprooveScreen from "./DonationAprooveScreen";
import { AvailableAppointment, Hospital } from "@zm-blood-components/common";


export default {
  component: DonationAprooveScreen,
  title: "Screens/About Screen",
  parameters: { layout: "fullscreen" },
};

const appointment : AvailableAppointment = {
  id: "appointment-1",
  donationStartTimeMillis: 1628845200000,
  hospital: Hospital.TEL_HASHOMER,
}

export const Default = () => <DonationAprooveScreen firstName="" apointmentNotAprooved={appointment}/>;
