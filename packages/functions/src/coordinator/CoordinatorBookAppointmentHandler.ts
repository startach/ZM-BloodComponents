import { FunctionsApi, MANUAL_DONOR_ID } from "@zm-blood-components/common";
import { bookAppointment } from "../common/BookAppointmentHelper";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.CoordinatorBookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  if (request.donorId !== MANUAL_DONOR_ID) {
    const donors = await CoordinatorDAL.getAdminDonors(callerId);

    const availableDonors = new Set(
      donors.filter((donor) => !donor.testUser).map((donor) => donor.id)
    );

    if (!availableDonors.has(request.donorId)) {
      return {
        status: FunctionsApi.BookAppointmentStatus.NO_PERMISSIONS_FOR_DONOR,
      };
    }
  }

  return bookAppointment(
    request.donorId,
    request.appointmentIds,
    callerId,
    request.donorDetails
  );
}
