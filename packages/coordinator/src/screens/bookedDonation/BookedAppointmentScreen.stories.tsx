import BookedAppointmentScreen, {
  BookedAppointmentScreenProps,
} from "./BookedAppointmentScreen";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  AppointmentStatus,
  BloodType,
  BookedAppointment,
  Hospital,
  TestSamples,
} from "@zm-blood-components/common";

export default {
  component: BookedAppointmentScreen,
  title: "Screens/Booked Appointment",
  parameters: { layout: "fullscreen" },
} as Meta;

const appointment: BookedAppointment = {
  ...TestSamples.SampleBookedAppointment,
  donationStartTimeMillis: 1640998861000,
  bookingTimeMillis: 1702008800000,
  bloodType: BloodType.AB_PLUS,
  status: AppointmentStatus.COMPLETED,
  id: "appointmentId",
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
