import { FunctionsApi, MANUAL_DONOR_ID } from "@zm-blood-components/common";
import { bookAppointment } from "../common/BookAppointmentHelper";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.CoordinatorBookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  if (request.donorId !== MANUAL_DONOR_ID) {
    const coordinator = await CoordinatorDAL.getCoordinator(callerId);

    if (!coordinator) {
      throw Error(`User ${callerId} is not an admin`);
    }
  }

  return bookAppointment(
    request.donorId,
    request.appointmentIds,
    callerId,
    request.donorDetails
  );
}
