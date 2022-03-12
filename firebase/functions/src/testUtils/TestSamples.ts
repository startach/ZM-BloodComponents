import {
  AppointmentStatus,
  BloodType,
  Hospital,
} from "@zm-blood-components/common";
import { setDonor } from "../dal/DonorDataAccessLayer";
import { DbAppointment, DbDonor } from "../function-types";
import * as admin from "firebase-admin";

export const sampleUser = {
  email: "email",
  phone: "phone",
  bloodType: BloodType.A_MINUS,
  firstName: "firstName",
  lastName: "lastName",
  birthDate: "2020-11-13",
  groupId: "group1",
  testUser: false,
};

export const SampleAvailableDbAppointment: DbAppointment = {
  creationTime: admin.firestore.Timestamp.now(),
  creatorUserId: "CreatorUserId",
  donationStartTime: admin.firestore.Timestamp.now(),
  hospital: Hospital.BEILINSON,
  donorId: "",
  status: AppointmentStatus.AVAILABLE,
};

export const SampleBookedDbAppointment: DbAppointment = {
  creationTime: admin.firestore.Timestamp.now(),
  creatorUserId: "CreatorUserId",
  donationStartTime: admin.firestore.Timestamp.now(),
  hospital: Hospital.BEILINSON,
  donorId: "donorId",
  status: AppointmentStatus.BOOKED,
  bookingTime: admin.firestore.Timestamp.now(),
};

export function saveTestDonor(donorId: string, donorFields?: Partial<DbDonor>) {
  const donor: DbDonor = {
    id: donorId,
    ...sampleUser,
    ...donorFields,
  };

  return setDonor(donor);
}
