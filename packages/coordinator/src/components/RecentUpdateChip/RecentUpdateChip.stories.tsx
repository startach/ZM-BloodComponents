import RecentUpdateChip, { RecentUpdateChipProps } from "./RecentUpdateChip";
import { Meta, Story } from "@storybook/react";
import { BookingChange } from "@zm-blood-components/common";

export default {
  component: RecentUpdateChip,
  title: "Components/Recent Change Chip",
  parameters: { layout: "padded" },
} as Meta;

const Template: Story<RecentUpdateChipProps> = (args) => (
  <RecentUpdateChip {...args} />
);

export const Booked = Template.bind({});
Booked.args = {
  recentChangeType: BookingChange.BOOKED,
};

export const Completed = Template.bind({});
Completed.args = {
  recentChangeType: BookingChange.COMPLETED,
};

export const NoShow = Template.bind({});
NoShow.args = {
  recentChangeType: BookingChange.NOSHOW,
};

export const Cancelled = Template.bind({});
Cancelled.args = {
  recentChangeType: BookingChange.CANCELLED,
};
