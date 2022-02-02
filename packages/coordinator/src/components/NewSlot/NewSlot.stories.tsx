import NewSlot, { NewSlotProps } from "./NewSlot";
import { Meta, Story } from "@storybook/react";
import { Hospital } from "@zm-blood-components/common";
import { action } from "@storybook/addon-actions";

export default {
  component: NewSlot,
  title: "Components/New Slot",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: NewSlotProps = {
  slot: {
    donationStartTimeMillis: 1641202200000,
    slots: 3,
    hospital: Hospital.TEL_HASHOMER,
  },
  onDelete: action("onDelete"),
};

const Template: Story<NewSlotProps> = (args) => <NewSlot {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props,
};
