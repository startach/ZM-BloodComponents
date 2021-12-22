import { DateUtils } from "@zm-blood-components/common";
import { Appointment } from "../../utils/types";

export function getAppointmentCopyString(appointment: Appointment): string {
  if (
    !appointment.donationStartTimeMillis ||
    !appointment.donorName ||
    !appointment.donorPhoneNumber
  ) {
    return "";
  }

  return `${appointment.donorName}, ${String(
    appointment.donorPhoneNumber
  )}, ${DateUtils.ToDateString(
    appointment.donationStartTimeMillis
  )} ${DateUtils.ToTimeString(appointment.donationStartTimeMillis)}`;
}
