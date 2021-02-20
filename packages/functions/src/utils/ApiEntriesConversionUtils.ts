import { DbAppointment, FunctionsApi } from "@zm-blood-components/common";

export function dbAppointmentToBookedAppointmentApiEntry(
  appointment: DbAppointment
): FunctionsApi.BookedAppointmentApiEntry {
  if (!appointment.id || !appointment.donorId) {
    console.error(
      "Cannot convert BookedAppointmentApiEntry with no id or donor id"
    );
    throw new Error("Invalid State");
  }

  return {
    id: appointment.id,
    donorId: appointment.donorId,
    hospital: appointment.hospital,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
  };
}

export function dbAppointmentToAvailableAppointmentApiEntry(
  appointment: DbAppointment
): FunctionsApi.AvailableAppointmentApiEntry {
  if (!appointment.id || appointment.donorId) {
    console.error(
      "Cannot convert AvailableAppointmentApiEntry with no id or with donor id"
    );
    throw new Error("Invalid State");
  }

  return {
    id: appointment.id,
    hospital: appointment.hospital,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
  };
}
