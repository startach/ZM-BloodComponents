import AppointmentScreen, { AppointmentScreenProps } from "./AppointmentScreen";
import { Meta } from "@storybook/react";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { he } from "date-fns/locale";
import { action } from "@storybook/addon-actions";

export default {
  component: AppointmentScreen,
  title: "Screens/Appointment Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const onSubmit = (date: Date, hour: Date, slots: number) => {
  action("onSubmitNewSlots");
};

const props: AppointmentScreenProps = {
  onSubmit: onSubmit,
};

export const Default = (args: AppointmentScreenProps) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
      <AppointmentScreen {...args} />
    </MuiPickersUtilsProvider>
  );
};

Default.args = props;
