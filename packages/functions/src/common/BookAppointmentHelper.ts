import { getDonorOrThrow, setDonor } from "../dal/DonorDataAccessLayer";
import {
  getAppointmentsByDonorIdInTime,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import * as admin from "firebase-admin";
import {
  AppointmentStatus,
  BookingChange,
  FunctionsApi,
  Hospital,
  MANUAL_DONOR_ID,
  MinimalDonorDetailsForAppointment,
} from "@zm-blood-components/common";
import { dbAppointmentToBookedAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";
import { notifyOnAppointmentBooked } from "../notifications/BookAppointmentNotifier";
import { DbDonor } from "../function-types";

const WEEKS_BUFFER = 0;

export async function bookAppointment(
  donorId: string,
  appointmentIds: string[],
  coordinatorId?: string,
  donorDetails?: MinimalDonorDetailsForAppointment
): Promise<FunctionsApi.BookAppointmentResponse> {
  const appointmentsToBook = await getAppointmentsByIds(appointmentIds);
  if (appointmentsToBook.length === 0) {
    // None of the appointment ids was found in the DB
    return { status: FunctionsApi.BookAppointmentStatus.NO_SUCH_APPOINTMENTS };
  }

  const availableAppointments = appointmentsToBook.filter(
    (appointment) => appointment.status === AppointmentStatus.AVAILABLE
  );
  if (availableAppointments.length === 0) {
    // None of the requested appointments is available
    return {
      status: FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS,
    };
  }
  const appointmentToBook = availableAppointments[0];
  appointmentToBook.donorId = donorId;
  appointmentToBook.bookingTime = admin.firestore.Timestamp.now();
  appointmentToBook.lastChangeTime = admin.firestore.Timestamp.now();
  appointmentToBook.lastChangeType = BookingChange.BOOKED;
  appointmentToBook.status = AppointmentStatus.BOOKED;

  if (coordinatorId && donorId === MANUAL_DONOR_ID) {
    if (!donorDetails) {
      return {
        status: FunctionsApi.BookAppointmentStatus.DONOR_DETAILS_REQUIRED,
      };
    }
    appointmentToBook.donorDetails = donorDetails;
    appointmentToBook.assigningCoordinatorId = coordinatorId;
  } else {
    const donor = await getDonorOrThrow(donorId);

    const donorAppointments = await getAppointmentsByDonorIdInTime(
      donorId,
      appointmentToBook.donationStartTime.toDate(),
      WEEKS_BUFFER
    );
    if (donorAppointments.length > 0) {
      return {
        status: FunctionsApi.BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER,
      };
    }

    const updateDonorPromise = updateDonorAsync(
      donor,
      appointmentToBook.hospital
    );

    notifyOnAppointmentBooked(appointmentToBook, donor).catch((e) =>
      console.error(
        "Error notifying on booked appointment",
        appointmentToBook.id,
        e
      )
    );
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
