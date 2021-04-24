import { BookingChange, DbAppointment } from "./types";
import { AppointmentApiEntry } from "./functions-api";
import * as admin from "firebase-admin";

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
    lastChangeTime: admin.firestore.Timestamp.now(),
    lastChangeType: BookingChange.CANCELLED,
  };
}
