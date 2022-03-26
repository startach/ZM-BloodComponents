import { firestore } from "firebase-admin";
import {
  AppointmentStatus,
  BloodType,
  BookingChange,
  CoordinatorRole,
  DonorNotificationSettings,
  Hospital,
  MinimalDonorDetailsForAppointment,
} from "@zm-blood-components/common";

export type DbDonor = {
  id: string; // UUID generated by firebase
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  phone: string;
  bloodType: BloodType;
  groupId: string;
  notificationSettings?: DonorNotificationSettings;

  // Fields changing after booking a donation
  lastBookingTime?: firestore.Timestamp;
  lastBookedHospital?: Hospital; // The hospital of the last booked donation of the donor

  // Fields changing after completing a donation
  lastCompletedDonationTime?: firestore.Timestamp;

  testUser: boolean;
};

type SystemUser = {
  id: string;
  role: CoordinatorRole.SYSTEM_USER;
};
type Advocate = {
  id: string;
  role: CoordinatorRole.ADVOCATE;
};
export type HospitalCoordinator = {
  id: string; // UUID generated by firebase
  role: CoordinatorRole.HOSPITAL_COORDINATOR;
  hospitals: Hospital[];
};
export type DbCoordinator = SystemUser | Advocate | HospitalCoordinator;

export type DbGroup = {
  id: string; // UUID generated by firebase
  name: string;
  coordinatorId: string;
};

export type DbAppointment = {
  id?: string;

  // Pre-donor
  creationTime: firestore.Timestamp;
  creatorUserId: string;
  donationStartTime: firestore.Timestamp;
  hospital: Hospital;
  status: AppointmentStatus;

  // added donor
  donorId: string; // Empty string means appointment is available
  donorDetails?: MinimalDonorDetailsForAppointment;
  assigningCoordinatorId?: string;
  bookingTime?: firestore.Timestamp;
  confirmationTime?: firestore.Timestamp; // Time donor confirmed they will come
  /* Represents changes to booking status **/
  lastChangeTime?: firestore.Timestamp;
  lastChangeType?: BookingChange;
  donationDoneTimeMillis?: firestore.Timestamp;
};