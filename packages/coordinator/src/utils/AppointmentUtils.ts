import { BookingChange, FunctionsApi } from "@zm-blood-components/common";

export function removeDonorFromAppointment(
  appointment: FunctionsApi.AppointmentApiEntry
): FunctionsApi.AppointmentApiEntry {
  const { donorId, bookingTimeMillis, ...otherProperties } = appointment;
  return {
    ...otherProperties,
    donorId: "",
    recentChangeType: BookingChange.CANCELLED,
  };
}
