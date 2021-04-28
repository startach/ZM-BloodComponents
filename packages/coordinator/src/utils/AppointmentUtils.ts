import { BookingChange } from "@zm-blood-components/common";
import { AppointmentApiEntry } from "@zm-blood-components/common/lib/functions-api";

export function removeDonorFromAppointment(
  appointment: AppointmentApiEntry
): AppointmentApiEntry {
  const { donorId, bookingTimeMillis, ...otherProperties } = appointment;
  return {
    ...otherProperties,
    donorId: "",
    recentChangeType: BookingChange.CANCELLED,
  };
}
