import { CallableContext } from "firebase-functions/lib/providers/https";
import { DbDonor, FunctionsApi } from "@zm-blood-components/common";
import { setDonor } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.SaveDonorRequest,
  context: CallableContext
) {
  const callerId = context.auth?.uid;
  if (!callerId) {
    throw new Error("User must be authenticated to save donor");
  }

  if (callerId !== request.id) {
    throw new Error("Unauthorized saveDonor request");
  }

  const donor: DbDonor = {
    id: request.id,
    email: request.email,
    phone: request.phone,
    bloodType: request.bloodType,
  };

  await setDonor(donor);
}
