import { AppointmentApiEntry } from "common/src/functions-api";
import { BookingChange } from "common/src/types";

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
