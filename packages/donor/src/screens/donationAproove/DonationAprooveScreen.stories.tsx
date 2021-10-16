import DonationAprooveScreen from "./DonationAprooveScreen";
import { NotAproovedAppointment, Hospital } from "@zm-blood-components/common";


export default {
  component: DonationAprooveScreen,
  title: "Screens/About Screen",
  parameters: { layout: "fullscreen" },
};

const appointment : NotAproovedAppointment = {
  id: "appointment-1",
  donationStartTimeMillis: 1628845200000,
  hospital: Hospital.TEL_HASHOMER,
  bookingTimeMillis: 1628845200000,
  donorId: "ZWeoYpX0XsaU0OyOIoINWK4Fcdi2"
}

export const Default = () => <DonationAprooveScreen firstName="" apointmentNotAprooved={appointment}/>;
