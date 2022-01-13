import BookManualDonationScreen, {
  BookManualDonationScreenProps,
} from "./BookManualDonationScreen";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  component: BookManualDonationScreen,
  title: "Screens/Book Manual Donation Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: BookManualDonationScreenProps = {
  donationStartTime: new Date(1628845200000),
  onSave: action("onSave"),
};

export const Default = () => <BookManualDonationScreen {...props} />;
