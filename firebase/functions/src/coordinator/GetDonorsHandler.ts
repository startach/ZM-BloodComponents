import { CoordinatorRole, FunctionsApi } from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import { DbDonor } from "../function-types";
import { dbDonorToDonor } from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.GetDonorsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorsResponse> {
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
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (coordinator.hospitals) {
        donors = await DonorDAL.getDonorsByLastBookedHospital(
          coordinator.hospitals
        );
      }
      break;
    case CoordinatorRole.ADVOCATE:
      throw Error("Advocate is not permitted to request donors");
  }

  const res = donors.filter((donor) => !donor.testUser).map(dbDonorToDonor);
  return { donors: res };
}
