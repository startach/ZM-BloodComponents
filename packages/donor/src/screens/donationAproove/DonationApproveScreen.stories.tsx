import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import {
  BookedAppointment,
  Hospital,
  AppointmentStatus,
} from "@zm-blood-components/common";
import DonationApproveScreen, {
  DonationApproveScreenProps,
} from "./DonationApproveScreen";

const a: BookedAppointment = {
  bookingTimeMillis: 123324123,
  donationStartTimeMillis: 13241432,
  donorId: "1jmgf6YUK4Px7SzFNV2dII6evb52",
  hospital: Hospital.SOROKA,
  id: "f324t243g435g",
  status: AppointmentStatus.NOSHOW,
};

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
  hospital: Hospital.HADASA,
  appointmentId: "1234",
  donationStartTimeMillis: 946677600000,
  onShowOptionSelected: action("onShowOptionSelected"),
};
