import { getDonorOrThrow, setDonor } from "../dal/DonorDataAccessLayer";
import {
  getAppointmentsByDonorIdInTime,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import * as admin from "firebase-admin";
import {
  AppointmentStatus,
  AppointmentUtils,
  BookingChange,
  FunctionsApi,
  Hospital,
  MinimalDonorDetailsForAppointment,
} from "@zm-blood-components/common";
import { dbAppointmentToBookedAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";
import { notifyOnAppointmentBooked } from "../notifications/BookAppointmentNotifier";
import { DbAppointment, DbDonor } from "../function-types";

export interface ValidBookAppointmentResponse {
  status: FunctionsApi.BookAppointmentStatus;
  appointment?: DbAppointment;
}

export async function bookAppointment(
  donorId: string,
  appointmentIds: string[],
  shouldNotify: boolean,
  coordinatorId?: string,
  donorDetails?: MinimalDonorDetailsForAppointment
): Promise<FunctionsApi.BookAppointmentResponse> {
  const appointmentsToBook = await getAppointmentsByIds(appointmentIds);

  if (appointmentsToBook.length === 0) {
    // None of the appointment ids was found in the DB
    throw new Error("No such appointments");
  }

  const { appointment: appointmentToBook, status } = validateBookAppointment(
    appointmentsToBook,
    donorId,
    coordinatorId,
    donorDetails
  );

  if (
    !appointmentToBook ||
    status !== FunctionsApi.BookAppointmentStatus.SUCCESS
  ) {
    return { status };
  }

  appointmentToBook.donorId = donorId;
  appointmentToBook.bookingTime = admin.firestore.Timestamp.now();
  appointmentToBook.lastChangeTime = admin.firestore.Timestamp.now();
  appointmentToBook.lastChangeType = BookingChange.BOOKED;
  appointmentToBook.status = AppointmentStatus.BOOKED;

  if (coordinatorId && AppointmentUtils.isManualDonor(donorId)) {
    appointmentToBook.donorDetails = donorDetails;
    appointmentToBook.assigningCoordinatorId = coordinatorId;
  } else {
    const donor = await getDonorOrThrow(donorId);

    const updateDonorPromise = updateDonorAsync(
      donor,
      appointmentToBook.hospital
    );
    if (shouldNotify) {
      notifyOnAppointmentBooked(appointmentToBook, donor).catch((e) =>
        console.error(
          "Error notifying on booked appointment",
          appointmentToBook.id,
          e
        )
      );
    }
    await updateDonorPromise;
  }
  await setAppointment(appointmentToBook);

  return {
    status: FunctionsApi.BookAppointmentStatus.SUCCESS,
    bookedAppointment:
      dbAppointmentToBookedAppointmentApiEntry(appointmentToBook),
  };
}

function updateDonorAsync(donor: DbDonor, hospital: Hospital) {
  const updatedDonor: DbDonor = {
    ...donor,
    lastBookedHospital: hospital,
    lastBookingTime: admin.firestore.Timestamp.now(),
  };

  return setDonor(updatedDonor);
}

export function validateBookAppointment(
  appointments: DbAppointment[],
  donorId: string,
  coordinatorId?: string,
  donorDetails?: MinimalDonorDetailsForAppointment
): ValidBookAppointmentResponse {
  if (!appointments || appointments.length === 0) {
    throw new Error("No such appointments");
  }

  const availableAppointments = appointments.filter(
    (appointment) => appointment.status === AppointmentStatus.AVAILABLE
  );

  if (availableAppointments.length === 0) {
    // None of the requested appointments is available
    return {
      status: FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS,
    };
  }
  const appointmentToBook = availableAppointments[0];

  if (
    coordinatorId &&
    AppointmentUtils.isManualDonor(donorId) &&
    !donorDetails
  ) {
    return {
      status: FunctionsApi.BookAppointmentStatus.DONOR_DETAILS_REQUIRED,
    };
  }
  return {
    status: FunctionsApi.BookAppointmentStatus.SUCCESS,
    appointment: appointmentToBook,
  };
}
