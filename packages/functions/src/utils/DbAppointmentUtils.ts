import {
  AppointmentStatus,
  AppointmentUtils,
  BloodType,
  BookedDonationWithDonorDetails,
  BookingChange,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import { DbAppointment, DbDonor } from "../function-types";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";

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

export function isAppointmentAvailable(appointment: DbAppointment) {
  switch (appointment.status) {
    case AppointmentStatus.AVAILABLE:
      return true;
    case AppointmentStatus.BOOKED:
    case AppointmentStatus.CONFIRMED:
    case AppointmentStatus.COMPLETED:
    case AppointmentStatus.NOSHOW:
      return false;
  }

  throw new Error("Invalid appointment status for availability check");
}

export function isAppointmentBooked(appointment: DbAppointment) {
  return !isAppointmentAvailable(appointment);
}

export function isManualDonorAppointment(appointment: DbAppointment) {
  return AppointmentUtils.isManualDonor(appointment.donorId);
}

export async function toBookedDonationWithDonorDetails(
  appointment: DbAppointment
): Promise<BookedDonationWithDonorDetails> {
  let firstName: string;
  let lastName: string;
  let phone: string;
  let bloodType: BloodType;
  if (AppointmentUtils.isManualDonor(appointment.donorId)) {
    firstName = appointment.donorDetails!.firstName;
    lastName = appointment.donorDetails!.lastName;
    phone = appointment.donorDetails!.phoneNumber;
    bloodType = appointment.donorDetails!.bloodType;
  } else {
    const donor = await DonorDataAccessLayer.getDonor(appointment.donorId);
    if (!donor) {
      throw new Error("Could not find donor for booked appointment");
    }
    firstName = donor.firstName;
    lastName = donor.lastName;
    phone = donor.phone;
    bloodType = donor.bloodType;
  }

  return {
    appointmentId: appointment.id!,
    donorId: appointment.donorId,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
    bookingTimeMillis: appointment.bookingTime!.toMillis(),
    hospital: appointment.hospital,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    bloodType: bloodType,
    status: appointment.status,
  };
}
