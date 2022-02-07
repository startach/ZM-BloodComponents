import { FunctionsApi } from "@zm-blood-components/common";
import { validateCancelAppointment } from "../common/CancelAppointmentHelper";
import { setAppointment } from "../dal/AppointmentDataAccessLayer";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { notifyOnCancelAppointment } from "../notifications/CancelAppointmentNotifier";
import {
  getAppointmentByIdOrThrow,
  removeDonorFromDbAppointment,
} from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.CancelAppointmentRequest,
  callerId: string
) {
  const donorId = callerId;

  if (!request.appointmentId) {
    throw new Error("No appointment to cancel");
  }

  const appointment = await getAppointmentByIdOrThrow(request.appointmentId);

  validateCancelAppointment(appointment, donorId);

  const updatedAppointment = removeDonorFromDbAppointment(appointment);

  await setAppointment(updatedAppointment);

  const donor = await getDonor(donorId);
  notifyOnCancelAppointment(appointment, donor!).catch((e) =>
    console.error("Error notifying on cancelled appointment", appointment.id, e)
  );
}
