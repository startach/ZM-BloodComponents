import {
  getAppointmentsByIds,
  confirmArrivedFromDbAppointment,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";

export default async function (
  request: FunctionsApi.ConfirmAppointmentRequest,
  callerId: string
) {
  const donorId = callerId;

  if (!request.appointmentId) {
    throw new Error("No appointment to confirm");
  }

  const appointmentToConfirm = await getAppointmentsByIds([
    request.appointmentId,
  ]);
  if (appointmentToConfirm.length !== 1) {
    throw new Error("Appointment not found");
  }

  const appointment = appointmentToConfirm[0];
  if (appointment.donorId !== donorId) {
    throw new Error("Appointment to be confirmed is not booked by donor");
  }

  // TODO add notification

  const updatedAppointment = confirmArrivedFromDbAppointment(appointment);

  const confirmedAppointment = await setAppointment(updatedAppointment);

  return {
    appointment: confirmedAppointment,
  };
}
