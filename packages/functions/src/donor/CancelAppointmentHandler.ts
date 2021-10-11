import {
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { notifyOnCancelAppointment } from "../notifications/CancelAppointmentNotifier";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.CancelAppointmentRequest,
  callerId: string
) {
  const donorId = callerId;

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

  const donor = await getDonor(donorId);
  notifyOnCancelAppointment(appointment, donor!).catch((e) =>
    console.error("Error notifying on cancelled appointment", appointment.id, e)
  );

  const updatedAppointment = DbAppointmentUtils.removeDonorFromDbAppointment(
    appointment
  );

  await setAppointment(updatedAppointment);
}
