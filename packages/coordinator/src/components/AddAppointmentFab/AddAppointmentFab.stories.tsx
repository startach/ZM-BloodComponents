import { Meta, Story } from "@storybook/react";
import AddAppointmentFab, { AddAppointmentFabProps } from "./AddAppointmentFab";
import { Hospital } from "@zm-blood-components/common";

export default {
  component: AddAppointmentFab,
  title: "Components/Add Appointment Fab",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default: Story<AddAppointmentFabProps> = (args) => {
  return <AddAppointmentFab hospital={Hospital.TEL_HASHOMER} />;
};
