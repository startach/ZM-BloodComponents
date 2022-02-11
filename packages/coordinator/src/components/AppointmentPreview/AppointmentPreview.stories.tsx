import AppointmentPreview, {
  AppointmentPreviewProps,
} from "./AppointmentPreview";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { TestSamples, BookingChange } from "@zm-blood-components/common";

export default {
  component: AppointmentPreview,
  title: "Components/Appointment Preview",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: AppointmentPreviewProps = {
  appointment: TestSamples.SampleBookedAppointment,
  onDelete: action("onDelete"),
  addBottomDivider: false,
};

const Template: Story<AppointmentPreviewProps> = (args) => (
  <AppointmentPreview {...args} />
);

export const AvailableAppointment = Template.bind({});
AvailableAppointment.args = {
  ...props,
  appointment: TestSamples.SampleAvailableAppointment,
};

export const BookedAppointment = Template.bind({});
BookedAppointment.args = {
  ...props,
  appointment: TestSamples.SampleBookedAppointment,
};

export const RecentlyBooked = Template.bind({});
RecentlyBooked.args = {
  ...props,
  appointment: {
    ...TestSamples.SampleBookedAppointment,
    recentChangeType: BookingChange.BOOKED,
  },
};

export const RecentlyCompleted = Template.bind({});
RecentlyCompleted.args = {
  ...props,
  appointment: {
    ...TestSamples.SampleBookedAppointment,
    recentChangeType: BookingChange.COMPLETED,
  },
};

export const RecentlyNoShow = Template.bind({});
RecentlyNoShow.args = {
  ...props,
  appointment: {
    ...TestSamples.SampleBookedAppointment,
    recentChangeType: BookingChange.NOSHOW,
  },
};

export const RecentlyCancelled = Template.bind({});
RecentlyCancelled.args = {
  ...props,
  appointment: {
    ...TestSamples.SampleAvailableAppointment,
    recentChangeType: BookingChange.CANCELLED,
  },
};
