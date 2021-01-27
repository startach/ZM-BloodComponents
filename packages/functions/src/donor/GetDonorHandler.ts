import { CallableContext } from "firebase-functions/lib/providers/https";
import { AdminRole, FunctionsApi } from "@zm-blood-components/common";
import { getAdmin } from "../dal/AdminDataAccessLayer";
import { getDonor } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetDonorRequest,
  context: CallableContext
) {
  const callerId = context.auth?.uid;
  if (!callerId) {
    throw new Error("User must be authenticated to get donor");
  }

  if (!request.donorId) {
    throw new Error("Invalid getDonor request");
  }

  await validateCallerAllowedToGetDonor(callerId, request.donorId);

  const res = await getDonor(request.donorId);

  return res;
}

async function validateCallerAllowedToGetDonor(
  callerId: string,
  donorId: string
) {
  if (callerId === donorId) {
    return;
  }

  // Checking if caller has permissions to get donor:
  const admin = await getAdmin(callerId);
  if (!admin) {
    throw new Error("Unauthorized getDonor request");
  }

  if (
    admin.roles.includes(AdminRole.SYSTEM_USER) ||
    admin.roles.includes(AdminRole.ZM_MANAGER)
  ) {
    return;
  }

  throw new Error("Unauthorized getDonor request");
}
