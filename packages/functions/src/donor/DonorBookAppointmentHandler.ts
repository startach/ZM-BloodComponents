import { FunctionsApi } from "@zm-blood-components/common";

import { bookAppointment } from "../common/BookAppointmentHelper";

export default async function (
  request: FunctionsApi.BookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  return bookAppointment(callerId, true, request.appointmentIds);
}
