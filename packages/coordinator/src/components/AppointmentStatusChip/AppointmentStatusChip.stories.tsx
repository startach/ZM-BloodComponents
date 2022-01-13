import AppointmentStatusChip, {
  AppointmentStatusChipProps,
} from "./AppointmentStatusChip";
import { Meta, Story } from "@storybook/react";
import { AppointmentStatus, BookingChange } from "@zm-blood-components/common";

export default {
  component: AppointmentStatusChip,
  title: "Components/Appointment Status Chip",
  parameters: { layout: "padded" },
} as Meta;

const Template: Story<AppointmentStatusChipProps> = (args) => (
  <AppointmentStatusChip {...args} />
);

export const Available = Template.bind({});
Available.args = {
  appointmentStatusType: AppointmentStatus.AVAILABLE,
};

export const Booked = Template.bind({});
Booked.args = {
  appointmentStatusType: AppointmentStatus.BOOKED,
};

export const Completed = Template.bind({});
Completed.args = {
  appointmentStatusType: AppointmentStatus.COMPLETED,
};

export const NoShow = Template.bind({});
NoShow.args = {
  appointmentStatusType: AppointmentStatus.NOSHOW,
};

export const Confirmed = Template.bind({});
Confirmed.args = {
  appointmentStatusType: AppointmentStatus.CONFIRMED,
};
