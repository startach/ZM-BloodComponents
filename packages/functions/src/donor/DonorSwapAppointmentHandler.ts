import { FunctionsApi } from "@zm-blood-components/common";

import { bookAppointment } from "../common/BookAppointmentHelper";
import { validateCancelAppointment } from "../common/CancelAppointmentHelper";
import {
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { removeDonorFromDbAppointment } from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.SwapAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.SwapAppointmentResponse> {
  await cancelAppointment(callerId, {
    appointmentId: request.cancelAppointmentId,
  });

  const { bookedAppointment, status } = await bookAppointment(
    callerId,
    request.bookAppointmentIds,
    false
  );

  // TODO Notify Swap Appointment

  return { status, bookedAppointment };
}

async function cancelAppointment(
  callerId: string,
  request: FunctionsApi.CancelAppointmentRequest
) {
  const donorId = callerId;

  if (!request.appointmentId) {
    throw new Error("No appointment to cancel");
  }

  const foundAppointments = await getAppointmentsByIds([request.appointmentId]);

  await validateCancelAppointment(foundAppointments, donorId);

  const appointment = foundAppointments[0];

  const updatedAppointment = removeDonorFromDbAppointment(appointment);

  await setAppointment(updatedAppointment);
}
