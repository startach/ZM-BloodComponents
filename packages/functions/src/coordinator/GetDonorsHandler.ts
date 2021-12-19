import { FunctionsApi } from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import { dbDonorToDonor } from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.GetDonorsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorsResponse> {
  // TODO : should it return also manual donor that this coordinator regisered?
  const donors = await CoordinatorDAL.getCoordinatorDonors(callerId);

  const res = donors.filter((donor) => !donor.testUser).map(dbDonorToDonor);
  return { donors: res };
}
