import { FunctionsApi } from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import { dbDonorToDonor } from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.GetDonorsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorsResponse> {
  const donors = await CoordinatorDAL.getAdminDonors(callerId);

  const res = donors.filter((donor) => !donor.testUser).map(dbDonorToDonor);
  return { donors: res };
}
