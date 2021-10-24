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
} from "@zm-blood-components/common";
import { dbAppointmentToBookedAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";
import { notifyOnAppointmentBooked } from "../notifications/BookAppointmentNotifier";
import { BookAppointmentStatus } from "../../../common/src/functions-api";
import { DbDonor } from "../function-types";

const WEEKS_BUFFER = 0;

export default async function (
  request: FunctionsApi.BookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  const donorId = callerId;

  const donor = await getDonorOrThrow(donorId);

  const appointmentsToBook = await getAppointmentsByIds(request.appointmentIds);
  if (appointmentsToBook.length === 0) {
    // None of the appointment ids was found in the DB
    return { status: BookAppointmentStatus.NO_SUCH_APPOINTMENTS };
  }

  const availableAppointments = appointmentsToBook.filter(
    (appointment) => appointment.status === AppointmentStatus.AVAILABLE
  );
  if (availableAppointments.length === 0) {
    // None of the requested appointments is available
    return { status: BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS };
  }

  const appointmentToBook = availableAppointments[0];

  const donorAppointments = await getAppointmentsByDonorIdInTime(
    donorId,
    appointmentToBook.donationStartTime.toDate(),
    WEEKS_BUFFER
  );
  if (donorAppointments.length > 0) {
    return { status: BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER };
  }
  const updateDonorPromise = updateDonorAsync(
    donor,
    appointmentToBook.hospital
  );

  appointmentToBook.donorId = donorId;
  appointmentToBook.bookingTime = admin.firestore.Timestamp.now();
  appointmentToBook.lastChangeTime = admin.firestore.Timestamp.now();
  appointmentToBook.lastChangeType = BookingChange.BOOKED;
  appointmentToBook.status = AppointmentStatus.BOOKED;

  await setAppointment(appointmentToBook);
  await updateDonorPromise;

  notifyOnAppointmentBooked(appointmentToBook, donor).catch((e) =>
    console.error(
      "Error notifying on booked appointment",
      appointmentToBook.id,
      e
    )
  );

  return {
    status: BookAppointmentStatus.SUCCESS,
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
