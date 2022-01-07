import {
  BookingChange,
  Donor,
  DonorNotificationSettings,
  FunctionsApi,
  MANUAL_DONOR_ID,
} from "@zm-blood-components/common";
import { DbAppointment, DbDonor } from "../function-types";

export function dbDonorToDonor(dbDonor: DbDonor): Donor {
  const notificationSettings: DonorNotificationSettings =
    dbDonor.notificationSettings || {
      disableEmailNotifications: false,
    };

  return {
    ...dbDonor,
    notificationSettings: notificationSettings,
  };
}

export function dbAppointmentToAppointmentApiEntry(
  appointment: DbAppointment,
  donorsInAppointments: DbDonor[]
): FunctionsApi.AppointmentApiEntry {
  const {
    id,
    donorId,
    assigningCoordinatorId,
    hospital,
    donationStartTime,
    bookingTime,
  } = appointment;

  if (!id) {
    console.error("Cannot convert AppointmentApiEntry with no id");
    throw new Error("Invalid State");
  }

  let donorName: string | undefined;
  if (donorId) {
    if (donorId === MANUAL_DONOR_ID) {
      donorName = `${appointment.donorDetails?.firstName} ${appointment.donorDetails?.lastName}`;
    } else {
      const donor = donorsInAppointments.filter((d) => d.id === donorId)[0];
      donorName = `${donor.firstName} ${donor.lastName}`;
    }
  }

  return {
    id: id,
    donorId: donorId,
    donorName,
    assigningCoordinatorId: assigningCoordinatorId,
    hospital: hospital,
    donationStartTimeMillis: donationStartTime.toMillis(),
    bookingTimeMillis: bookingTime?.toMillis(),
    recentChangeType: getRecentChangeType(appointment),
  };
}

export function dbAppointmentToBookedAppointmentApiEntry(
  appointment: DbAppointment
): FunctionsApi.BookedAppointmentApiEntry {
  const {
    id,
    donorId,
    hospital,
    donationStartTime,
    bookingTime,
    status,
    donorDetails,
    assigningCoordinatorId,
  } = appointment;

  if (!id || !donorId || !bookingTime) {
    console.error(
      "Cannot convert BookedAppointmentApiEntry with no id or donor id"
    );
    throw new Error("Invalid State");
  }

  return {
    id: id,
    donorId: donorId,
    donorDetails: donorDetails,
    assigningCoordinatorId: assigningCoordinatorId,
    hospital: hospital,
    donationStartTimeMillis: donationStartTime.toMillis(),
    bookingTimeMillis: bookingTime?.toMillis(),
    recentChangeType: getRecentChangeType(appointment),
    status: status,
  };
}

export function dbAppointmentToAvailableAppointmentApiEntry(
  appointment: DbAppointment
): FunctionsApi.AvailableAppointmentApiEntry {
  const { id, donorId, hospital, donationStartTime } = appointment;

  if (!id || donorId) {
    console.error(
      "Cannot convert AvailableAppointmentApiEntry with no id or with donor id"
    );
    throw new Error("Invalid State");
  }

  return {
    id: id,
    hospital: hospital,
    donationStartTimeMillis: donationStartTime.toMillis(),
    recentChangeType: getRecentChangeType(appointment),
  };
}

export const getRecentChangeType = ({
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
