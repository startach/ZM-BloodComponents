import { FunctionsApi } from "@zm-blood-components/common";
import { bookAppointment } from "../common/BookAppointmentHelper";

export default async function (
  request: FunctionsApi.CoordinatorBookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  return bookAppointment(
    request.donorId,
    request.appointmentIds,
    callerId,
    request.donorDetails
  );
}
