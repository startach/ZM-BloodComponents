import { FunctionsApi } from "@zm-blood-components/common";

import {
  bookAppointment,
  validateBookAppointment,
} from "../common/BookAppointmentHelper";
import {
  cancelAppointment,
  validateCancelAppointment,
} from "../common/CancelAppointmentHelper";

export default async function (
  request: FunctionsApi.SwapAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.SwapAppointmentResponse> {
  const bookAppointmentValidation = validateBookAppointment(
    request.bookAppointmentIds,
    callerId
  );

  const cancelAppointmentValidation = validateCancelAppointment(
    request.cancelAppointmentId,
    callerId
  );

  // Unified promises due to low performance
  const [
    { status: bookAppointmentStatus },
    { isValid: isCancelValid, invalidReason: cancellationInvalidReason },
  ] = await Promise.all([
    bookAppointmentValidation,
    cancelAppointmentValidation,
  ]);

  if (bookAppointmentStatus !== FunctionsApi.BookAppointmentStatus.SUCCESS) {
    return { status: bookAppointmentStatus };
  }

  if (!isCancelValid) {
    throw new Error(cancellationInvalidReason);
  }

  const { bookedAppointment } = await bookAppointment(
    callerId,
    request.bookAppointmentIds,
    false
  );

  await cancelAppointment(
    callerId,
    { appointmentId: request.cancelAppointmentId },
    false
  );

  // TODO Notify Swap Appointment

  return { status: bookAppointmentStatus, bookedAppointment };
}
