import AppointmentSlotComponent, {
  AppointmentPreviewProps,
} from "./AppointmentSlotComponent";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  SampleAvailableAppointment,
  SampleBookedAppointment,
} from "../../__test__/TestSamples";
import { BookingChange } from "@zm-blood-components/common";
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
      SampleAvailableAppointment,
      SampleBookedAppointment,
      {
        ...SampleBookedAppointment,
        appointmentId: "booked",
        recentChangeType: BookingChange.BOOKED,
      },
      {
        ...SampleBookedAppointment,
        appointmentId: "completed",
        recentChangeType: BookingChange.COMPLETED,
      },
      {
        ...SampleBookedAppointment,
        appointmentId: "no show",
        recentChangeType: BookingChange.NOSHOW,
      },
      {
        ...SampleAvailableAppointment,
        appointmentId: "cancelled",
        recentChangeType: BookingChange.CANCELLED,
      },
    ],
  },
  onClickOnAppointment: action("onClickOnAppointment"),
  onAdd: action("onAdd"),
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
