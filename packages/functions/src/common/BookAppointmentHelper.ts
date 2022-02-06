import { getDonorOrThrow, setDonor } from "../dal/DonorDataAccessLayer";
import {
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
import { notifyOnAppointmentBooked } from "../notifications/BookAppointmentNotifier";
import { DbDonor, DbAppointment } from "../function-types";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

export type ValidBookAppointmentResponse =
  | ValidBookAppointment
  | InvalidBookAppointment;

type ValidBookAppointment = {
  status: FunctionsApi.BookAppointmentStatus.SUCCESS;
  appointment: DbAppointment;
};
type InvalidBookAppointment = {
  status: FunctionsApi.BookAppointmentStatus;
};

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

  const bookValidation = validateBookAppointment(
    appointmentsToBook,
    donorId,
    coordinatorId,
    donorDetails
  );

  if (bookValidation.status !== FunctionsApi.BookAppointmentStatus.SUCCESS) {
    return { status: bookValidation.status };
  }

  const appointmentToBook = (bookValidation as ValidBookAppointment)
    .appointment;

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
  const bookedAppointment = await DbAppointmentUtils.toBookedAppointmentAsync(
    appointmentToBook
  );

  return {
    status: FunctionsApi.BookAppointmentStatus.SUCCESS,
    bookedAppointment,
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
  if (appointments.length === 0) {
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
