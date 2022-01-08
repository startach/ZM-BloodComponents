import BookedAppointmentScreen, {
  BookedAppointmentScreenProps,
} from "./BookedAppointmentScreen";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  AppointmentStatus,
  BloodType,
  Hospital,
} from "@zm-blood-components/common";

export default {
  component: BookedAppointmentScreen,
  title: "Screens/Booked Appointment",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: BookedAppointmentScreenProps = {
  appointment: {
    firstName: "משה",
    lastName: "כהן",
    donationStartTimeMillis: 1702198800000,
    bloodType: BloodType.AB_PLUS,
    phone: "0522222222",
    status: AppointmentStatus.NOSHOW,
    appointmentId: "appointmentId",
    hospital: Hospital.TEL_HASHOMER,
    donorId: "donorId",
  },
  onRemoveDonor: action("onRemoveDonor"),
  onCopyAppointmentDetails: action("onCopyAppointmentDetails"),
};

const Template: Story<BookedAppointmentScreenProps> = (args) => (
  <BookedAppointmentScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
