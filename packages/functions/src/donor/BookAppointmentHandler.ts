import { CallableContext } from "firebase-functions/lib/providers/https";
import { getDonor } from "../dal/DonorDataAccessLayer";
import {
  getAppointmentsByIds,
  getAppointmentsByDonorIdInTime,
  updateAppointment,
} from "../dal/AppointmentDataAccessLayer";
import * as admin from "firebase-admin";
import { FunctionsApi } from "@zm-blood-components/common";

const WEEKS_BUFFER = 4;

export default async function (
  request: FunctionsApi.BookAppointmentRequest,
  context: CallableContext
) {
  const donorId = context.auth?.uid;
  if (!donorId) {
    throw new Error("User must be authenticated to book donation");
  }

  const donor = await getDonor(donorId);
  if (!donor) {
    throw Error("Donor not found");
  }

  const appointmentsToBook = await getAppointmentsByIds(request.appointmentIds);
  const availableAppointments = appointmentsToBook.filter(
    (appointment) => !appointment.donorId
  );
  if (availableAppointments.length === 0) {
    throw new Error("No appointments to book");
  }

  const appointmentToBook = availableAppointments[0];

  const donorAppointments = await getAppointmentsByDonorIdInTime(
    donorId,
    appointmentToBook.donationStartTime.toDate(),
    WEEKS_BUFFER
  );
  if (donorAppointments.length > 0) {
    throw new Error("Donor has other donations in buffer");
  }

  appointmentToBook.donorId = donorId;
  appointmentToBook.bookingTime = admin.firestore.Timestamp.now();

  await updateAppointment(appointmentToBook);
}
