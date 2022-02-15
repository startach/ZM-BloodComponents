import {
  AppointmentStatus,
  AppointmentUtils,
  AvailableAppointment,
  BloodType,
  BookedAppointment,
  BookingChange,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import { DbAppointment, DbDonor } from "../function-types";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import * as functions from "firebase-functions";

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

  functions.logger.error(`Invalid appointment status for availability check in
       ${JSON.stringify(appointment)}`);
  throw new Error("Invalid appointment status for availability check");
}

export function isAppointmentBooked(appointment: DbAppointment) {
  return !isAppointmentAvailable(appointment);
}

export function isManualDonorAppointment(appointment: DbAppointment) {
  return AppointmentUtils.isManualDonor(appointment.donorId);
}

export function toAvailableAppointment(
  appointment: DbAppointment
): AvailableAppointment {
  const { id, donorId, hospital, donationStartTime, status } = appointment;

  if (!id || donorId || status !== AppointmentStatus.AVAILABLE) {
    console.error(
      "Cannot convert AvailableAppointmentApiEntry with no id or with donor id",
      JSON.stringify(appointment)
    );
    throw new Error("Invalid Available Appointment");
  }

  return {
    id: id,
    booked: false,
    status,
    hospital: hospital,
    donationStartTimeMillis: donationStartTime.toMillis(),
    recentChangeType: getRecentChangeType(appointment),
  };
}

export async function toBookedAppointmentAsync(
  appointment: DbAppointment
): Promise<BookedAppointment> {
  if (AppointmentUtils.isManualDonor(appointment.donorId)) {
    return manuallyBookedAppointmentToBookedAppointment(appointment);
  } else {
    const donor = await DonorDataAccessLayer.getDonor(appointment.donorId);
    return realBookedAppointmentToBookedAppointment(appointment, donor);
  }
}

export function toBookedAppointmentSync(
  appointment: DbAppointment,
  getDonor: (donorId: string) => DbDonor
): BookedAppointment {
  if (AppointmentUtils.isManualDonor(appointment.donorId)) {
    return manuallyBookedAppointmentToBookedAppointment(appointment);
  } else {
    const donor = getDonor(appointment.donorId);
    if (!donor) {
      throw new Error("Could not find donor for booked appointment");
    }
    return toBookedAppointmentInternal(
      appointment,
      donor.firstName,
      donor.lastName,
      donor.phone,
      donor.bloodType
    );
  }
}

function manuallyBookedAppointmentToBookedAppointment(
  appointment: DbAppointment
) {
  if (!AppointmentUtils.isManualDonor(appointment.donorId)) {
    throw Error("Expected manually booked appointment");
  }

  const bookedAppointment = toBookedAppointmentInternal(
    appointment,
    appointment.donorDetails!.firstName,
    appointment.donorDetails!.lastName,
    appointment.donorDetails!.phoneNumber,
    appointment.donorDetails!.bloodType
  );
  bookedAppointment.assigningCoordinatorId = appointment.assigningCoordinatorId;
  return bookedAppointment;
}

function realBookedAppointmentToBookedAppointment(
  appointment: DbAppointment,
  donor?: DbDonor
) {
  if (!donor) {
    throw new Error("Could not find donor for booked appointment");
  }
  if (AppointmentUtils.isManualDonor(appointment.donorId) || !donor) {
    throw Error("Expected real booked appointment");
  }

  return toBookedAppointmentInternal(
    appointment,
    donor.firstName,
    donor.lastName,
    donor.phone,
    donor.bloodType
  );
}

function toBookedAppointmentInternal(
  appointment: DbAppointment,
  firstName: string,
  lastName: string,
  phone: string,
  bloodType: BloodType
): BookedAppointment {
  return {
    id: appointment.id!,
    booked: true,
    donorId: appointment.donorId,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
    bookingTimeMillis: appointment.bookingTime!.toMillis(),
    hospital: appointment.hospital,
    firstName: firstName,
    lastName: lastName,
    fullName: firstName + " " + lastName,
    phone: phone,
    bloodType: bloodType,
    status: appointment.status,
    recentChangeType: getRecentChangeType(appointment),
  };
}

const getRecentChangeType = ({
  lastChangeTime,
  lastChangeType,
}: DbAppointment): BookingChange | undefined => {
  let recentChangeType: BookingChange | undefined;

  const ONE_DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

  if (
    lastChangeTime &&
    Date.now() - lastChangeTime.toMillis() < ONE_DAY_IN_MILLIS
  ) {
    recentChangeType = lastChangeType;
  }

  return recentChangeType;
};
