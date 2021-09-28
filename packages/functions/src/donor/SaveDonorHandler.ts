import { DbDonor, FunctionsApi } from "@zm-blood-components/common";
import { setDonor } from "../dal/DonorDataAccessLayer";
import { dbDonorToDonor } from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.SaveDonorRequest,
  callerId: string
): Promise<FunctionsApi.SaveDonorResponse> {
  if (callerId !== request.id) {
    throw new Error("Unauthorized saveDonor request");
  }

  const dbDonor: DbDonor = {
    id: request.id,
    firstName: request.firstName,
    lastName: request.lastName,
    birthDate: request.birthDate,
    email: request.email,
    phone: request.phone,
    bloodType: request.bloodType,
    notificationSettings: request.notificationSettings,
    completedDonationsCount: 0,

    //TODO add group Id
    groupId: "",

    testUser: false,
  };

  await setDonor(dbDonor);

  return {
    donor: dbDonorToDonor(dbDonor),
  };
}
