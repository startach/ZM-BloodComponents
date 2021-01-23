import { CallableContext } from "firebase-functions/lib/providers/https";
import {
  getAppointmentsByIds,
  updateAppointment,
} from "../firestore/AppointmentDataAccessLayer";
import * as _ from "lodash";

interface CancelAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentId: string;
}

export default async function (
  request: CancelAppointmentRequest,
  context: CallableContext
) {
  const donorId = context.auth?.uid;
  if (!donorId) {
    throw new Error("User must be authenticated to cancel appointment");
  }

  if (!request.appointmentId) {
    throw new Error("No appointment to cancel");
  }

  const appointmentToCancel = await getAppointmentsByIds([
    request.appointmentId,
  ]);
  if (appointmentToCancel.length !== 1) {
    throw new Error("Appointment not found");
  }

  const appointment = appointmentToCancel[0];
  if (appointment.donorId !== donorId) {
    throw new Error("Appointment to be deleted is not booked by donor");
  }

  const updatedAppointment = _.omit(appointment, [
    "donorId",
    "bookingTime",
    "confirmationTime",
  ]);

  await updateAppointment(updatedAppointment);
}
