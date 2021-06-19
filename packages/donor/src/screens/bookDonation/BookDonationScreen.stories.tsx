import BookDonationScreen, {
  BookDonationScreenProps,
} from "./BookDonationScreen";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { AvailableAppointment, Hospital } from "@zm-blood-components/common";

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
};

const sampleAppointments: AvailableAppointment[] = [
  {
    id: "appointment-1",
    donationStartTimeMillis: 1628845200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    id: "appointment-2",
    donationStartTimeMillis: 1628846200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    id: "appointment-3",
    donationStartTimeMillis: 1628847200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    id: "appointment-4",
    donationStartTimeMillis: 1628848200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    id: "appointment-5",
    donationStartTimeMillis: 1628849200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    id: "appointment-6",
    donationStartTimeMillis: 1628850200000,
    hospital: Hospital.TEL_HASHOMER,
  },
  {
    id: "appointment-7",
    donationStartTimeMillis: 1628845200000,
    hospital: Hospital.BEILINSON,
  },
];

const Template: Story<BookDonationScreenProps> = (args) => (
  <BookDonationScreen {...args} />
);

export const NoAppointments = Template.bind({});
NoAppointments.args = props;

export const HasAppointments = (args: BookDonationScreenProps) => (
  <BookDonationScreen {...args} />
);

HasAppointments.args = {
  ...props,
  availableAppointments: sampleAppointments,
};

export const Fetching = (args: BookDonationScreenProps) => (
  <BookDonationScreen {...args} />
);

Fetching.args = {
  ...props,
  isFetching: true,
};
