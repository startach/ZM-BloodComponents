import {
  CoordinatorRole,
  DbDonor,
  FunctionsApi,
} from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import * as DonorDAL from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetDonorsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorsResponse> {
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
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      //TODO we need hospital field in donors to do this
      break;
    case CoordinatorRole.ZM_COORDINATOR:
    //TODO also needs the hospital result
    case CoordinatorRole.GROUP_COORDINATOR:
      const groupIds = await GroupDAL.getGroupIdsOfCoordinatorId(
        coordinator.id
      );
      donors = await DonorDAL.getDonorsByGroupIds(groupIds);
      break;
  }

  const res = donors.filter((donor) => !donor.testUser);
  return { donors: res };
}
