import { Hospital } from "@zm-blood-components/common";
import DonationInfo, {
  DonationToBookInfoProps as DonationInfoProps,
} from "./DonationInfo";
import { Story } from "@storybook/react";

export default {
  component: DonationInfo,
  title: "Components/Donation to Book",
  parameters: { layout: "fullscreen" },
};

const props: DonationInfoProps = {
  donationStartTimeMillis: 1625823300000,
  hospital: Hospital.ICHILOV,
  isPreviousAppointmentInfo: false,
};

const Template: Story<DonationInfoProps> = (args) => <DonationInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props,
};
