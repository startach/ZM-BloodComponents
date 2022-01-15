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

const props: AddAppointmentScreenProps = {
  initialDate: new Date(1641914113000),
  onSubmit: action("onSubmitNewSlots"),
};

export const Default = (args: AddAppointmentScreenProps) => {
  return <AddAppointmentScreen {...args} />;
};

Default.args = props;
