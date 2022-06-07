import Popup from "../basic/Popup";
import { FunctionsApi } from "@zm-blood-components/common";

interface BookingAppointmentErrorPopupProps {
  errorCode?: FunctionsApi.BookAppointmentStatus;
  onApproved: () => Promise<void>;
}

export default function BookingAppointmentErrorPopup({
  errorCode,
  onApproved,
}: BookingAppointmentErrorPopupProps) {
  if (!errorCode) {
    return null;
  }

  let text = "";
  switch (errorCode) {
    case FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS:
      text =
        'מצטערים, התור הזה הרגע נתפס ע"י תורם/ת אחר/ת. אנא הירשם/י למועד אחר';
      break;
  }

  return (
    <Popup
      name="reschedule_appointment"
      title={"אופס!"}
      buttonApproveText={"בחירת מועד חדש"}
      open={true}
      onApproved={onApproved}
    >
      {text}
    </Popup>
  );
}
