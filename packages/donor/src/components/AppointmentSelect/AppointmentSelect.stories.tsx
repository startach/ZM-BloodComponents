import {
  AppointmentStatus,
  AvailableAppointment,
  BloodType,
  BookedAppointment,
  Hospital,
} from "@zm-blood-components/common";
import AppointmentSelect, { AppointmentSelectProps } from "./AppointmentSelect";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
  component: AppointmentSelect,
  title: "Components/Appointment Select",
  parameters: { layout: "fullscreen" },
};

const appointments = generateAppointments(8);
const appointmentIndexToHide = 3;
const appointmentToHide: BookedAppointment = {
  ...appointments[appointmentIndexToHide],
  booked: true,
  donorId: "donor",
  firstName: "donor",
  lastName: "donor",
  fullName: "donor",
  bloodType: BloodType.AB_MINUS,
  phone: "1",
  bookingTimeMillis: 1638845200000,
};
const tooCloseDonationPopupProps = {
  open: false,
  onApproved: () => {},
  onBack: () => {},
};
const props: AppointmentSelectProps = {
  onSlotSelected: action("Selected"),
  isSwapAppointment: false,
  availableAppointments: appointments,
  isFetching: false,
  tooCloseDonationPopupProps: tooCloseDonationPopupProps,
  appointmentToHide: appointmentToHide,
};

const Template: Story<AppointmentSelectProps> = (args) => (
  <AppointmentSelect {...args} />
);
export const Default = Template.bind({});
Default.args = {
  ...props,
};

function generateAppointments(
  numberOfAppointments: number
): AvailableAppointment[] {
  let appointments: AvailableAppointment[] = [];
  const firstAppointmentMillis = 1628845200000;

  for (let i = 0; i < numberOfAppointments; i++) {
    const startTimeMillis = firstAppointmentMillis + i * 45 * 60 * 1_000;
    appointments.push({
      id: "donation_" + i,
      donationStartTimeMillis: startTimeMillis,
      hospital: i % 2 ? Hospital.SOROKA : Hospital.BEILINSON,
      status: AppointmentStatus.AVAILABLE,
      booked: false,
    });
  }
  return appointments;
}
