import DonationDayScreen, { DonationDayScreenProps } from "./DonationDayScreen";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  BookingChange,
  Hospital,
  TestSamples,
} from "@zm-blood-components/common";

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
            ...TestSamples.SampleBookedAppointment,
            id: "no show",
            recentChangeType: BookingChange.NOSHOW,
          },
        ],
      },
      {
        donationStartTimeMillis: 1702206000000, // December 10, 2023 13:00:00 GMT+02:00
        appointments: [
          TestSamples.SampleBookedAppointment,
          {
            ...TestSamples.SampleBookedAppointment,
            id: "completed",
            recentChangeType: BookingChange.COMPLETED,
          },
          {
            ...TestSamples.SampleAvailableAppointment,
            id: "cancelled",
            recentChangeType: BookingChange.CANCELLED,
          },
        ],
      },
      {
        donationStartTimeMillis: 1702211400000, // December 10, 2023 13:00:00 GMT+02:00
        appointments: [
          TestSamples.SampleAvailableAppointment,
          {
            ...TestSamples.SampleBookedAppointment,
            id: "booked",
            recentChangeType: BookingChange.BOOKED,
          },
        ],
      },
    ],
  },
  onDeleteAppointment: action("onDeleteAppointment"),
  onAdd: action("onAdd"),
  dayStartTime: new Date(1702198800000),
  hospital: Hospital.TEL_HASHOMER,
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
