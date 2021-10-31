import { DateUtils } from "@zm-blood-components/common";
import { ManagedAppointment } from "./CoordinatorAppointmentsGrouper";

export function getAppointmentCopyString(
  appointment: ManagedAppointment
): string {
  if (
    !appointment.donationStartTimeMillis ||
    !appointment.donorName ||
    !appointment.donorPhoneNumber
  ) {
    return "";
  }

  const copyString: string = `${appointment.donorName}, ${String(
    appointment.donorPhoneNumber
  )}, ${DateUtils.ToDateString(
    appointment.donationStartTimeMillis
  )} ${DateUtils.ToTimeString(appointment.donationStartTimeMillis)}`;

  return copyString;
}
