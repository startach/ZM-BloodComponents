import AddAppointmentScreen, {
  AddAppointmentScreenProps,
} from "./AddAppointmentScreen";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Hospital } from "@zm-blood-components/common";

export default {
  component: AddAppointmentScreen,
  title: "Screens/Add Appointment Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: AddAppointmentScreenProps = {
  hospital: Hospital.ASAF_HAROFE,
  initialDate: new Date(1851914113000),
  onSubmit: action("onSubmitNewSlots"),
};

const Template: Story<AddAppointmentScreenProps> = (args) => (
  <AddAppointmentScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const Beilinson = Template.bind({});
Beilinson.args = {
  ...props,
  hospital: Hospital.BEILINSON,
};
