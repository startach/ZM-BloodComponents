import { Meta, Story } from "@storybook/react";
import AddAppointmentFab, { AddAppointmentFabProps } from "./AddAppointmentFab";

export default {
  component: AddAppointmentFab,
  title: "Components/Add Appointment Fab",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default: Story<AddAppointmentFabProps> = (args) => {
  return <AddAppointmentFab />;
};
