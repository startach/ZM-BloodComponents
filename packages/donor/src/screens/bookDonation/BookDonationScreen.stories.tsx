import BookDonationScreen, {
  BookDonationScreenProps,
} from "./BookDonationScreen";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import {
  AvailableAppointment,
  Hospital,
  TestSamples,
} from "@zm-blood-components/common";

export default {
  component: BookDonationScreen,
  title: "Screens/Book Donation Screen",
  parameters: { layout: "fullscreen" },
};

const props: BookDonationScreenProps = {
  availableAppointments: [],
  isFetching: false,
  firstName: "משה",
  defaultHospital: "",
  onSlotSelected: action("onSlotSelected"),
  tooCloseDonationPopupProps: {
    open: false,
    onApproved: () => {},
    onBack: () => {},
  },
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

const Template: Story<BookDonationScreenProps> = (args) => (
  <BookDonationScreen {...args} />
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