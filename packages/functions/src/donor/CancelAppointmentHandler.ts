import {
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import * as _ from "lodash";
import { AppointmentUtils, FunctionsApi } from "@zm-blood-components/common";

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

  appointment.donorId = "";
  const updatedAppointment = AppointmentUtils.removeDonorFromDbAppointment(
    appointment
  );

  await setAppointment(updatedAppointment);
}
