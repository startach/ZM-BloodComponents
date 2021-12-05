import { FunctionsApi } from "@zm-blood-components/common";

import { BookAppointment } from "../common/BookAppointmentHelper";

export default async function (
  request: FunctionsApi.BookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  return BookAppointment(callerId, true, request.appointmentIds);
}
