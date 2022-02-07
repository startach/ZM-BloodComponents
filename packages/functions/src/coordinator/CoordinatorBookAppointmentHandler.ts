import { FunctionsApi, AppointmentUtils } from "@zm-blood-components/common";
import { bookAppointment } from "../common/BookAppointmentHelper";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.CoordinatorBookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  if (!AppointmentUtils.isManualDonor(request.donorId)) {
    throw Error(`Coordinator booking for real donors is not supported yet`);
  }

  const coordinator = await CoordinatorDAL.getCoordinator(callerId);

  if (!coordinator) {
    throw Error(`User ${callerId} is not an admin`);
  }

  return bookAppointment(
    request.donorId,
    request.appointmentIds,
    false,
    callerId,
    request.donorDetails
  );
}
