import SwapDonationScreen, {
  SwapDonationScreenProps,
} from "./SwapDonationScreen";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import {
  AppointmentStatus,
  AvailableAppointment,
  BloodType,
  BookedAppointment,
  Hospital,
  TestSamples,
} from "@zm-blood-components/common";

export default {
  component: SwapDonationScreen,
  title: "Screens/Swap Donation Screen",
  parameters: { layout: "fullscreen" },
};

const currentAppointment: BookedAppointment = {
  id: "currentAppointment",
  donationStartTimeMillis: 1638845200000,
  hospital: Hospital.BEILINSON,
  status: AppointmentStatus.BOOKED,
  booked: true,
  donorId: "donor",
  firstName: "donor",
  lastName: "donor",
  fullName: "donor",
  bloodType: BloodType.AB_MINUS,
  phone: "1",
  bookingTimeMillis: 1638845200000,
};

const props: SwapDonationScreenProps = {
  availableAppointments: [],
  isFetching: false,
  firstName: "משה",
  onSlotSelected: action("onSlotSelected"),
  tooCloseDonationPopupProps: {
    open: false,
    onApproved: () => {},
    onBack: () => {},
  },
  currentAppointment: currentAppointment,
  onSwapDonation: action("onSwapDonation"),
  bookingErrorCode: undefined,
  refreshAppointments: async () => {},
  onBack: () => {},
  showSwapPopup: false,
  closeSwapPopup: () => {},
};

const sampleAppointments: AvailableAppointment[] = [
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-1",
    donationStartTimeMillis: 1628845200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-2",
    donationStartTimeMillis: 1628846200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-3",
    donationStartTimeMillis: 1628847200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-4",
    donationStartTimeMillis: 1628848200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-5",
    donationStartTimeMillis: 1628849200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-6",
    donationStartTimeMillis: 1628850200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-7",
    donationStartTimeMillis: 1628845200000,
    hospital: Hospital.BEILINSON,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-8",
    donationStartTimeMillis: 1628948200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-9",
    donationStartTimeMillis: 1628949200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-10",
    donationStartTimeMillis: 1628950200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    ...TestSamples.SampleAvailableAppointment,
    id: "appointment-11",
    donationStartTimeMillis: 1628945200000,
    hospital: Hospital.BEILINSON,
  },
];

const Template: Story<SwapDonationScreenProps> = (args) => (
  <SwapDonationScreen {...args} />
);

export const NoAppointments = Template.bind({});
NoAppointments.args = props;

export const HasAppointments = Template.bind({});

HasAppointments.args = {
  ...props,
  availableAppointments: sampleAppointments,
};

export const Fetching = Template.bind({});
Fetching.args = {
  ...props,
  isFetching: true,
};
