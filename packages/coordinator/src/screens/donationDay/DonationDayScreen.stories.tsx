import DonationDayScreen, { DonationDayScreenProps } from "./DonationDayScreen";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  SampleAvailableAppointment,
  SampleBookedAppointment,
} from "../../__test__/TestSamples";
import { BookingChange } from "@zm-blood-components/common";

export default {
  component: DonationDayScreen,
  title: "Screens/Donation Day",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: DonationDayScreenProps = {
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
  onDeleteAppointment: action("onDeleteAppointment"),
  onClickOnAppointment: action("onClickOnAppointment"),
  onAdd: action("onAdd"),
  dayStartTime: new Date(1702198800000),
};

const Template: Story<DonationDayScreenProps> = (args) => (
  <DonationDayScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const NoAppointments = Template.bind({});
NoAppointments.args = {
  ...props,
  donationDay: {
    appointmentSlots: [],
  },
};
