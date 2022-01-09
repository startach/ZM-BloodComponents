import AddAppointmentScreen, {
  AddAppointmentScreenProps,
} from "./AddAppointmentScreen";
import { Meta } from "@storybook/react";


import { action } from "@storybook/addon-actions";

export default {
  component: AddAppointmentScreen,
  title: "Screens/Add Appointment Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const onSubmit = (date: Date, hour: Date, slots: number) => {
  action("onSubmitNewSlots");
};

const props: AddAppointmentScreenProps = {
  onSubmit: onSubmit,
};

export const Default = (args: AddAppointmentScreenProps) => {
  return (
      <AddAppointmentScreen {...args} />
  );
};

Default.args = props;
