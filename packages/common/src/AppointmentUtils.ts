import { DbAppointment } from "./types";
import { AppointmentApiEntry } from "./functions-api";

export function removeDonorFromAppointment(
  appointment: AppointmentApiEntry
): AppointmentApiEntry {
  const { donorId, bookingTimeMillis, ...otherProperties } = appointment;
  return {
    ...otherProperties,
    donorId: "",
  };
}

export function removeDonorFromDbAppointment(
  appointment: DbAppointment
): DbAppointment {
  const {
    donorId,
    bookingTime,
    confirmationTime,
    ...otherProperties
  } = appointment;
  return {
    ...otherProperties,
    donorId: "",
  };
}
