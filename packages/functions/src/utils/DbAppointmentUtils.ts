import {
  AppointmentStatus,
  BookingChange,
  DbAppointment,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";

export function removeDonorFromDbAppointment(
  appointment: DbAppointment
): DbAppointment {
  const { donorId, bookingTime, confirmationTime, ...otherProperties } =
    appointment;
  return {
    ...otherProperties,
    donorId: "",
    lastChangeTime: admin.firestore.Timestamp.now(),
    lastChangeType: BookingChange.CANCELLED,
    status: AppointmentStatus.AVAILABLE,
  };
}

export function completeArrivedFromDbAppointment(
  appointment: DbAppointment
): DbAppointment {
  return {
    ...appointment,
    donationDoneTimeMillis: admin.firestore.Timestamp.now(),
    lastChangeTime: admin.firestore.Timestamp.now(),
    lastChangeType: BookingChange.COMPLETED,
    status: AppointmentStatus.COMPLETED,
  };
}
