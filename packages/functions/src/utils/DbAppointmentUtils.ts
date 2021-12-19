import { AppointmentStatus, BookingChange } from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import { DbAppointment } from "../function-types";

export function removeDonorFromDbAppointment(
  appointment: DbAppointment
): DbAppointment {
  const {
    donorId,
    bookingTime,
    confirmationTime,
    donorDetails,
    ...otherProperties
  } = appointment;

  return {
    ...otherProperties,
    donorId: "",
    lastChangeTime: admin.firestore.Timestamp.now(),
    lastChangeType: BookingChange.CANCELLED,
    status: AppointmentStatus.AVAILABLE,
  };
}

export function completeArrivedFromDbAppointment(
  appointment: DbAppointment,
  isNoshow: boolean
): DbAppointment {
  return {
    ...appointment,
    donationDoneTimeMillis: admin.firestore.Timestamp.now(),
    lastChangeTime: admin.firestore.Timestamp.now(),
    lastChangeType: isNoshow ? BookingChange.NOSHOW : BookingChange.COMPLETED,
    status: isNoshow ? AppointmentStatus.NOSHOW : AppointmentStatus.COMPLETED,
  };
}
