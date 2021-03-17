import { BloodType, DbDonor } from "@zm-blood-components/common";
import { setDonor } from "../dal/DonorDataAccessLayer";

export const sampleUser = {
  email: "email",
  phone: "phone",
  bloodType: BloodType.A_MINUS,
  firstName: "firstName",
  lastName: "lastName",
  birthDate: "2020-11-13",
};

export function saveTestDonor(donorId: string) {
  const donor: DbDonor = {
    id: donorId,
    ...sampleUser,
  };

  return setDonor(donor);
}
