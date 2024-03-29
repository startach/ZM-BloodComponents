import { FunctionsApi } from "@zm-blood-components/common";

import {
  bookAppointment,
  validateBookAppointment,
} from "../common/BookAppointmentHelper";
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
  if (!request.bookAppointmentIds) {
    throw new Error("No appointment to book");
  }

  if (!request.cancelAppointmentId) {
    throw new Error("No appointment to cancel");
  }

  const appointmentsToValidate = await getAppointmentsByIds([
    ...request.bookAppointmentIds,
    request.cancelAppointmentId,
  ]);

  if (!appointmentsToValidate) {
    throw new Error("Appointments not found");
  }

  const appointmentToCancel = appointmentsToValidate.find(
    (a) => a.id === request.cancelAppointmentId
  );

  validateCancelAppointment(appointmentToCancel, callerId);

  const appointmentsToBook = appointmentsToValidate.filter((a) =>
    request.bookAppointmentIds.includes(a.id!)
  );

  const { status } = validateBookAppointment(appointmentsToBook, callerId);

  if (status !== FunctionsApi.BookAppointmentStatus.SUCCESS) {
    return { status };
  }

  // Cancel appointment
  const cancelledAppointment = removeDonorFromDbAppointment(
    appointmentToCancel!
  );
  await setAppointment(cancelledAppointment);

  const bookAppointmentResponse = await bookAppointment(
    callerId,
    request.bookAppointmentIds,
    false
  );

  // TODO Notify Swap Appointment

  return bookAppointmentResponse;
}
