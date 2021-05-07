import { FunctionsApi } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetDonorRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorResponse> {
  if (!request.donorId) {
    throw new Error("Invalid getDonor request");
  }

  if (callerId !== request.donorId) {
    throw new Error("Unauthorized getDonor request");
  }

  const res = await getDonor(request.donorId);

  return {
    donor: res,
  };
}
