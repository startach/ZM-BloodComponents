import BookedAppointmentScreen, {
  BookedAppointmentScreenProps,
} from "./BookedAppointmentScreen";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  AppointmentStatus,
  BloodType,
  BookedDonationWithDonorDetails,
  Hospital,
} from "@zm-blood-components/common";

export default {
  component: BookedAppointmentScreen,
  title: "Screens/Booked Appointment",
  parameters: { layout: "fullscreen" },
} as Meta;

const appointment: BookedDonationWithDonorDetails = {
  firstName: "משה",
  lastName: "כהן",
  donationStartTimeMillis: 1640998861000,
  bookingTimeMillis: 1702008800000,
  bloodType: BloodType.AB_PLUS,
  phone: "0522222222",
  status: AppointmentStatus.COMPLETED,
  appointmentId: "appointmentId",
  hospital: Hospital.TEL_HASHOMER,
  donorId: "donorId",
};

const props: BookedAppointmentScreenProps = {
  appointment: appointment,
  onRemoveDonor: action("onRemoveDonor"),
  onCopyAppointmentDetails: action("onCopyAppointmentDetails"),
  markAppointmentAsCompleted: action("markAppointmentAsCompleted"),
};

const Template: Story<BookedAppointmentScreenProps> = (args) => (
  <BookedAppointmentScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const AppointmentNotPassed = Template.bind({});
AppointmentNotPassed.args = {
  ...props,
  appointment: {
    ...appointment,
    donationStartTimeMillis: 5702198800000,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  ...props,
  appointment: undefined,
};
