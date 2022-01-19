import { FunctionsApi } from "@zm-blood-components/common";
import { BookAppointmentStatus } from "common/src/functions-api";

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
  const { status } = await validateBookAppointment(
    request.bookAppointmentIds,
    callerId
  );

  if (status !== BookAppointmentStatus.SUCCESS) {
    return { status };
  }

  const { isValid, invalidReason } = await validateCancelAppointment(
    request.cancelAppointmentId,
    callerId
  );

  if (!isValid) {
    throw new Error(invalidReason);
  }

  const { status: bookAppointmentStatus, bookedAppointment } =
    await bookAppointment(callerId, [request.cancelAppointmentId], false);

  await cancelAppointment(
    callerId,
    { appointmentId: request.cancelAppointmentId },
    false
  );

  // TODO Notify Swap Appointment

  return { status: bookAppointmentStatus, bookedAppointment };
}
