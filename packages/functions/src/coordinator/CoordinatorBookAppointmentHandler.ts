import {
  FunctionsApi,
  CoordinatorRole,
  MANUAL_DONOR_ID,
} from "@zm-blood-components/common";
import { bookAppointment } from "../common/BookAppointmentHelper";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import { DbDonor } from "../function-types";

export default async function (
  request: FunctionsApi.CoordinatorBookAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.BookAppointmentResponse> {
  if (request.donorId !== MANUAL_DONOR_ID) {
    // check that the coordinator has permissions to this donor
    const coordinator = await CoordinatorDAL.getCoordinator(callerId);
    if (!coordinator) {
      console.error("Could not find calling user", callerId);
      throw Error(`User ${callerId} is not an admin`);
    }

    let donors: DbDonor[] = [];

    switch (coordinator.role) {
      case CoordinatorRole.SYSTEM_USER:
        donors = await DonorDAL.getAllDonors();
        break;
      case CoordinatorRole.ZM_COORDINATOR:
      // TODO should ZM_COORDINATOR also get donors that are in their group?
      case CoordinatorRole.HOSPITAL_COORDINATOR:
        if (coordinator.hospitals) {
          donors = await DonorDAL.getDonorsByLastBookedHospital(
            coordinator.hospitals
          );
        }
        break;
      case CoordinatorRole.GROUP_COORDINATOR:
        const groupIds = await GroupDAL.getGroupIdsOfCoordinatorId(
          coordinator.id
        );
        donors = await DonorDAL.getDonorsByGroupIds(groupIds);
        break;
    }

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
