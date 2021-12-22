import AppointmentPreview, {
  AppointmentPreviewProps,
} from "./AppointmentPreview";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  SampleAvailableAppointment,
  SampleBookedAppointment,
} from "../../__test__/TestSamples";
import { BookingChange } from "@zm-blood-components/common";

export default {
  component: AppointmentPreview,
  title: "Components/Appointment Preview",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: AppointmentPreviewProps = {
  appointment: SampleBookedAppointment,
  onClick: action("onClick"),
  onDelete: action("onDelete"),
};

const Template: Story<AppointmentPreviewProps> = (args) => (
  <AppointmentPreview {...args} />
);

export const AvailableAppointment = Template.bind({});
AvailableAppointment.args = {
  ...props,
  appointment: SampleAvailableAppointment,
};

export const BookedAppointment = Template.bind({});
BookedAppointment.args = {
  ...props,
  appointment: SampleBookedAppointment,
};

export const RecentlyBooked = Template.bind({});
RecentlyBooked.args = {
  ...props,
  appointment: {
    ...SampleBookedAppointment,
    recentChangeType: BookingChange.BOOKED,
  },
};

export const RecentlyCompleted = Template.bind({});
RecentlyCompleted.args = {
  ...props,
  appointment: {
    ...SampleBookedAppointment,
    recentChangeType: BookingChange.COMPLETED,
  },
};

export const RecentlyNoShow = Template.bind({});
RecentlyNoShow.args = {
  ...props,
  appointment: {
    ...SampleBookedAppointment,
    recentChangeType: BookingChange.NOSHOW,
  },
};

export const RecentlyCancelled = Template.bind({});
RecentlyCancelled.args = {
  ...props,
  appointment: {
    ...SampleAvailableAppointment,
    recentChangeType: BookingChange.CANCELLED,
  },
};
