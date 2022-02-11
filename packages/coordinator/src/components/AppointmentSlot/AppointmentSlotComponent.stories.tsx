import AppointmentSlotComponent, {
  AppointmentPreviewProps,
} from "./AppointmentSlotComponent";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { BookingChange, TestSamples } from "@zm-blood-components/common";
import styles from "./AppointmentSlotComponent.module.scss";

export default {
  component: AppointmentSlotComponent,
  title: "Components/Appointment Slot",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: AppointmentPreviewProps = {
  appointmentSlot: {
    donationStartTimeMillis: 1702198800000, // December 10, 2023 11:00:00 GMT+02:00
    appointments: [
      TestSamples.SampleAvailableAppointment,
      TestSamples.SampleBookedAppointment,
      {
        ...TestSamples.SampleBookedAppointment,
        id: "booked",
        recentChangeType: BookingChange.BOOKED,
      },
      {
        ...TestSamples.SampleBookedAppointment,
        id: "completed",
        recentChangeType: BookingChange.COMPLETED,
      },
      {
        ...TestSamples.SampleBookedAppointment,
        id: "no show",
        recentChangeType: BookingChange.NOSHOW,
      },
      {
        ...TestSamples.SampleAvailableAppointment,
        id: "cancelled",
        recentChangeType: BookingChange.CANCELLED,
      },
    ],
  },
  onDeleteAppointment: action("onDeleteAppointment"),
  showOnlyAvailableAppointments: false,
};

const Template: Story<AppointmentPreviewProps> = (args) => (
  <div className={styles.storyBackground}>
    <AppointmentSlotComponent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const OnlyAvailableAppointments = Template.bind({});
OnlyAvailableAppointments.args = {
  ...props,
  showOnlyAvailableAppointments: true,
};
