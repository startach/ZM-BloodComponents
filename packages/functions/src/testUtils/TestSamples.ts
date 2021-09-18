import { BloodType, DbDonor } from "@zm-blood-components/common";
import { setDonor } from "../dal/DonorDataAccessLayer";

export const sampleUser = {
  email: "email",
  phone: "phone",
  bloodType: BloodType.A_MINUS,
  firstName: "firstName",
  lastName: "lastName",
  birthDate: "2020-11-13",
  groupId: "group1",
  testUser: false,
  completedDonationsCount: 0,
};

export function saveTestDonor(donorId: string, donorFields?: Partial<DbDonor>) {
  const donor: DbDonor = {
    id: donorId,
    ...sampleUser,
    ...donorFields,
  };

  return setDonor(donor);
}
