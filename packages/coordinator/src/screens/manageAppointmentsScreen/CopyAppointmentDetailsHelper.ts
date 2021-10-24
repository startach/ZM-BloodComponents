import { DateUtils } from "@zm-blood-components/common";
import { ManagedAppointment } from "./CoordinatorAppointmentsGrouper";

export function getAppointmentCopyString(
  appointment: ManagedAppointment
): string {
  const bookingDateAndTime: string =
    appointment.donationStartTimeMillis !== undefined
      ? `${DateUtils.ToDateString(
          appointment.donationStartTimeMillis
        )} ${DateUtils.ToTimeString(appointment.donationStartTimeMillis)}`
      : "";
  const copyString: string = `${appointment.donorName}, ${String(
    appointment.donorPhoneNumber
  )}, ${bookingDateAndTime}`;

  return copyString;
}
