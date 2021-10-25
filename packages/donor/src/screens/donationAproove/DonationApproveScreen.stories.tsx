import { Story } from "@storybook/react";
import {
  BookedAppointment,
  Hospital,
  AppointmentStatus,
} from "@zm-blood-components/common";
import DonationApproveScreenContainer, {
  DonationApproveScreenContainerProps,
} from "./DonationApproveScreenContainer";

const a: BookedAppointment = {
  bookingTimeMillis: 123324123,
  donationStartTimeMillis: 13241432,
  donorId: "1jmgf6YUK4Px7SzFNV2dII6evb52",
  hospital: Hospital.SOROKA,
  id: "f324t243g435g",
  status: AppointmentStatus.NOSHOW,
};

export default {
  component: DonationApproveScreenContainer,
  title: "Screens/Approve Screen",
  argTypes: {
    firstName: { type: "string", defaultValue: "משה" },
  },
};

const Template: Story<DonationApproveScreenContainerProps> = (args) => (
  <DonationApproveScreenContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  firstName: "משה",
  appointmentNotApproved: a,
  setIsFetching: (isFetcing: boolean) => {},
  popNotApprovedAppointment: () => {},
};
