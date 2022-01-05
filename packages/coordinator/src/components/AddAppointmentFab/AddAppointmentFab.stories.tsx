import { Meta, Story } from "@storybook/react";
import AddAppointmentFab, { AddAppointmentFabProps } from "./AddAppointmentFab";
import { action } from "@storybook/addon-actions";

export default {
  component: AddAppointmentFab,
  title: "Components/Add Appointment Fab",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default: Story<AddAppointmentFabProps> = (args) => {
  return <AddAppointmentFab onClick={action("onClick")} />;
};
