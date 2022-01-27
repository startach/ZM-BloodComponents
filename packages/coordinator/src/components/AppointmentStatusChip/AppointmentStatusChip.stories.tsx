import AppointmentStatusChip, {
  AppointmentStatusChipProps,
} from "./AppointmentStatusChip";
import { Meta, Story } from "@storybook/react";
import { AppointmentStatus } from "@zm-blood-components/common";

export default {
  component: AppointmentStatusChip,
  title: "Components/Appointment Status Chip",
  parameters: { layout: "padded" },
} as Meta;

const props: AppointmentStatusChipProps = {
  appointmentStatusType: AppointmentStatus.AVAILABLE,
  donationStartTimeMillis: 1641819600000,
};

const Template: Story<AppointmentStatusChipProps> = (args) => (
  <AppointmentStatusChip {...args} />
);

export const Available = Template.bind({});
Available.args = {
  ...props,
  appointmentStatusType: AppointmentStatus.AVAILABLE,
};

export const BookedFuture = Template.bind({});
BookedFuture.args = {
  ...props,
  appointmentStatusType: AppointmentStatus.BOOKED,
  donationStartTimeMillis: 4103269200000,
};

export const BookedPast = Template.bind({});
BookedPast.args = {
  ...props,
  appointmentStatusType: AppointmentStatus.BOOKED,
};

export const Completed = Template.bind({});
Completed.args = {
  appointmentStatusType: AppointmentStatus.COMPLETED,
};

export const NoShow = Template.bind({});
NoShow.args = {
  ...props,
  appointmentStatusType: AppointmentStatus.NOSHOW,
};

export const Confirmed = Template.bind({});
Confirmed.args = {
  ...props,
  appointmentStatusType: AppointmentStatus.CONFIRMED,
};
