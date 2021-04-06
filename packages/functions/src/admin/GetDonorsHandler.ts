import { FunctionsApi } from "@zm-blood-components/common";
import { validateIsCoordinator } from "./UserValidator";
import { getAllDonors } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetDonorsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorsResponse> {
  await validateIsCoordinator(callerId);

  const donors = await getAllDonors();

  const res = donors.filter((donor) => !donor.testUser);
  return { donors: res };
}
