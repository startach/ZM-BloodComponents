import { Story } from "@storybook/react";
import { FunctionsApi } from "@zm-blood-components/common";

import BookingAppointmentErrorPopup, {
  BookingAppointmentErrorPopupProps,
} from "./BookingAppointmentErrorPopup";

export default {
  component: BookingAppointmentErrorPopup,
  title: "Components/Popup/BookingAppointmentErrorPopup",
};

const props: BookingAppointmentErrorPopupProps = {
  errorCode: FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS,
  onApproved: async () => { },
};

const Template: Story<BookingAppointmentErrorPopupProps> = (args) => {

  return (
    <BookingAppointmentErrorPopup {...args} />
  );
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};
