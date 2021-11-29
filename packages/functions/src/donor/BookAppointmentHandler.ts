import { FunctionsApi } from "@zm-blood-components/common";

import { BookAppointment } from "../common/BookAppointmentHelper";

export default async function (
  request: FunctionsApi.CoordinatorBookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  return BookAppointment(request, true, callerId);
}
