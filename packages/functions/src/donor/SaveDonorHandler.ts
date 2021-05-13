import { DbDonor, FunctionsApi } from "@zm-blood-components/common";
import { setDonor } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.SaveDonorRequest,
  callerId: string
) {
  if (callerId !== request.id) {
    throw new Error("Unauthorized saveDonor request");
  }

  const donor: DbDonor = {
    id: request.id,
    firstName: request.firstName,
    lastName: request.lastName,
    birthDate: request.birthDate,
    email: request.email,
    phone: request.phone,
    bloodType: request.bloodType,

    //TODO add group Id
    groupId: "",

    testUser: false,
  };

  await setDonor(donor);
}
