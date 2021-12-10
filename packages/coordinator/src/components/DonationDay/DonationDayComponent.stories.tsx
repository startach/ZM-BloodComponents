import DonationDayComponent, {
  DonationDayComponentProps,
} from "./DonationDayComponent";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  SampleAvailableAppointment,
  SampleBookedAppointment,
} from "../../__test__/TestSamples";
import { BookingChange } from "@zm-blood-components/common";

export default {
  component: DonationDayComponent,
  title: "Components/Donation Day",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: DonationDayComponentProps = {
  donationDay: {
    appointmentSlots: [
      {
        donationStartTimeMillis: 1702198800000, // December 10, 2023 11:00:00 GMT+02:00
        appointments: [
          {
            ...SampleBookedAppointment,
            appointmentId: "no show",
            recentChangeType: BookingChange.NOSHOW,
          },
        ],
      },
      {
        donationStartTimeMillis: 1702206000000, // December 10, 2023 13:00:00 GMT+02:00
        appointments: [
          SampleBookedAppointment,
          {
            ...SampleBookedAppointment,
            appointmentId: "completed",
            recentChangeType: BookingChange.COMPLETED,
          },
          {
            ...SampleAvailableAppointment,
            appointmentId: "cancelled",
            recentChangeType: BookingChange.CANCELLED,
          },
        ],
      },
      {
        donationStartTimeMillis: 1702211400000, // December 10, 2023 13:00:00 GMT+02:00
        appointments: [
          SampleAvailableAppointment,
          {
            ...SampleBookedAppointment,
            appointmentId: "booked",
            recentChangeType: BookingChange.BOOKED,
          },
        ],
      },
    ],
  },
  onClickOnAppointment: action("onClickOnAppointment"),
  onAdd: action("onAdd"),
};

const Template: Story<DonationDayComponentProps> = (args) => (
  <DonationDayComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
