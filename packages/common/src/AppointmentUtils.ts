import { BookingChange, DbAppointment } from "./types";
import { AppointmentApiEntry } from "./functions-api";
import firebase from "firebase";

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
    lastChangeTime: firebase.firestore.Timestamp.now(),
    lastChangeType: BookingChange.CANCELLED,
  };
}
