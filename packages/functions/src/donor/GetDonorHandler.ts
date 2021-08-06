import { FunctionsApi } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { dbDonorToDonor } from "../utils/ApiEntriesConversionUtils";

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

  const dbDonor = await getDonor(request.donorId);
  const res = dbDonor ? dbDonorToDonor(dbDonor) : undefined;

  return {
    donor: res,
  };
}
