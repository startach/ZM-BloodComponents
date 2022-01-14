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

  return getAppointmentCopyStringContent(
    appointment.donorName,
    appointment.donorPhoneNumber,
    appointment.donationStartTimeMillis
  );
}

export function getAppointmentCopyStringContent(
  donorName: string,
  donorPhoneNumber: string,
  donationStartTimeMillis: number
) {
  return `${donorName}, ${String(donorPhoneNumber)}, ${DateUtils.ToDateString(
    donationStartTimeMillis
  )} ${DateUtils.ToTimeString(donationStartTimeMillis)}`;
}
