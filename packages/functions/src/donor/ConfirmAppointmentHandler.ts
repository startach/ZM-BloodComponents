import {
  getAppointmentsByIds,
  confirmArrivedFromDbAppointment,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";
import { getDonorOrThrow } from "../dal/DonorDataAccessLayer";
import { NotificationToCoordinator } from "../notifications/NotificationSender";
//import { notifyOnAppointmentWithType } from "../notifications/SendAppointmentNotifier";

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

  //const donor = await getDonorOrThrow(donorId);
  // notifyOnAppointmentWithType(appointment, donor!, NotificationToCoordinator.APPOINTMENT_CONFIRMED).catch((e) =>
  //   console.error("Error notifying on confirmed appointment", appointment.id, e)
  // );

  const updatedAppointment = confirmArrivedFromDbAppointment(appointment);

  const confirmedAppointment = await setAppointment(updatedAppointment);

  return {
    appointment: confirmedAppointment,
  };
}
