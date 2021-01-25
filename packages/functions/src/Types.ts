import * as admin from "firebase-admin";

// Hospital has available machines
// Admin opens new slots in app
// Donors sign up in slots - if they are allowed to
// Not MVP - Send notification to donor
// Donor completes donation

// Admin can see users (all of them?)
// Admin can make another user admin

export enum BloodType {
  O_PLUS,
  O_MINUS,
  A_PLUS,
  A_MINUS,
  B_PLUS,
  B_MINUS,
  AB_PLUS,
  AB_MINUS,
}

export type Donor = {
  id: string; // UUID generated by firebase
  phone: string;
  email: string;
  bloodType: BloodType;
};

export enum AdminRole {
  // App development team
  SYSTEM_USER = "SYSTEM_USER",

  // Can add new ZM coordinators
  // Can control app configurations
  ZM_MANAGER = "ZM_MANAGER",

  // Can see all users
  ZM_COORDINATOR = "ZM_COORDINATOR",

  // Can create new appointments for their hospital
  HOSPITAL_COORDINATOR = "HOSPITAL_COORDINATOR",
}

export type Admin = {
  id: string; // UUID generated by firebase
  phone: string;
  email: string;
  roles: AdminRole[];
  hospitals?: Hospital[];
};

export enum Hospital {
  TEL_HASHOMER = "TEL_HASHOMER",
  ASAF_HAROFE = "ASAF_HAROFE",
}

export enum DonationType {
  Thrombocytes,
  Granulocytes,
}

export type Appointment = {
  // Slot + donor
  id?: string; // UUID
  // Pre-donor
  creationTime: admin.firestore.Timestamp;
  creatorUserId: string;
  donationStartTime: admin.firestore.Timestamp;
  hospital: Hospital;
  // requestedBloodType?: BloodType;

  // added donor
  donorId?: string;
  bookingTime?: Date;
  confirmationTime?: Date; // Time donor confirmed they will come

  // post donation
};