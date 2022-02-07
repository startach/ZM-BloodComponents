import { FunctionsApi } from "@zm-blood-components/common";
import { validateCancelAppointment } from "../common/CancelAppointmentHelper";
import {
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { notifyOnCancelAppointment } from "../notifications/CancelAppointmentNotifier";
import { removeDonorFromDbAppointment } from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.CancelAppointmentRequest,
  callerId: string
) {
  const donorId = callerId;

  if (!request.appointmentId) {
    throw new Error("No appointment to cancel");
  }

  const foundAppointments = await getAppointmentsByIds([request.appointmentId]);

  if (foundAppointments.length !== 1) {
    throw new Error("Appointment not found");
  }

  const appointment = foundAppointments[0];

  validateCancelAppointment(appointment, donorId);

  const updatedAppointment = removeDonorFromDbAppointment(appointment);

  await setAppointment(updatedAppointment);

  const donor = await getDonor(donorId);
  notifyOnCancelAppointment(appointment, donor!).catch((e) =>
    console.error("Error notifying on cancelled appointment", appointment.id, e)
  );
}
