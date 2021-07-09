import { Hospital } from "@zm-blood-components/common";
import DonationToBookInfo, {
  DonationToBookInfoProps,
} from "./DonationToBookInfo";
import { Story } from "@storybook/react";

export default {
  component: DonationToBookInfo,
  title: "Components/Donation to Book",
  parameters: { layout: "fullscreen" },
};

const props: DonationToBookInfoProps = {
  donationStartTimeMillis: 1625823300000,
  hospital: Hospital.ICHILOV,
};

const Template: Story<DonationToBookInfoProps> = (args) => (
  <DonationToBookInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
