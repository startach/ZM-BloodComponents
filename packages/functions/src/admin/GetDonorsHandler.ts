import { FunctionsApi } from "@zm-blood-components/common";
import { getAllDonors } from "../dal/DonorDataAccessLayer";
import { getCoordinator } from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.GetDonorsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorsResponse> {
  const coordinator = await getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User ${callerId} is not an admin`);
  }

  const donors = await getAllDonors();

  const res = donors.filter((donor) => !donor.testUser);
  return { donors: res };
}
