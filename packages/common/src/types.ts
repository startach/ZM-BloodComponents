// Hospital has available machines
// Admin opens new slots in app
// Donors sign up in slots - if they are allowed to
// Not MVP - Send notification to donor
// Donor completes donation

// Admin can see users (all of them?)
// Admin can make another user admin

export enum BloodType {
  O_PLUS = "O_PLUS",
  O_MINUS = "O_MINUS",
  A_PLUS = "A_PLUS",
  A_MINUS = "A_MINUS",
  B_PLUS = "B_PLUS",
  B_MINUS = "B_MINUS",
  AB_PLUS = "AB_PLUS",
  AB_MINUS = "AB_MINUS",
  NOT_SURE = "NOT_SURE",
}

export type DonorNotificationSettings = {
  disableEmailNotifications: boolean;
};

export type Donor = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  phone: string;
  bloodType: BloodType;
  notificationSettings: DonorNotificationSettings;
};

//https://docs.google.com/document/d/1Y3ovMRJhdHlJEd4rS3FCgxxY3qdpmk2WLaR45nL8IT8
export enum CoordinatorRole {
  SYSTEM_USER = "SYSTEM_USER",
  ZM_COORDINATOR = "ZM_COORDINATOR",
  HOSPITAL_COORDINATOR = "HOSPITAL_COORDINATOR",
  GROUP_COORDINATOR = "GROUP_COORDINATOR",
}

export type Coordinator = {
  role: CoordinatorRole;
  activeHospitalsForCoordinator: Hospital[];
  name: string | undefined;
};

export enum Hospital {
  TEL_HASHOMER = "TEL_HASHOMER",
  ASAF_HAROFE = "ASAF_HAROFE",
  BEILINSON = "BEILINSON",
  HADASA = "HADASA",
  ICHILOV = "ICHILOV",
  RAMBAM = "RAMBAM",
  SOROKA = "SOROKA",
}

export enum DonationType {
  Thrombocytes,
  Granulocytes,
}

export type BookedAppointment = {
  id: string;
  donationStartTimeMillis: number;
  hospital: Hospital;
  donorId: string;
  bookingTimeMillis: number;
};

export type NotAproovedAppointment = {
  id: string;
  donationStartTimeMillis: number;
  hospital: Hospital;
  donorId: string;
  bookingTimeMillis: number;
};

export type AvailableAppointment = {
  id: string;
  donationStartTimeMillis: number;
  hospital: Hospital;
};

export enum Collections {
  COORDINATORS = "coordinators",
  DONORS = "donors",
  APPOINTMENTS = "appointments",
  EMAIL_NOTIFICATIONS = "emailNotifications",
  GROUPS = "groups",
}

export enum LoginStatus {
  UNKNOWN,
  LOGGED_IN,
  LOGGED_OUT,
}

export interface SelectOption<T> {
  value: T;
  key: string;
  label: string;
}

export enum BookingChange {
  BOOKED = "BOOKED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export type BookedDonationWithDonorDetails = {
  appointmentId: string;
  donorId: string;
  donationStartTimeMillis: number;
  hospital: Hospital;
  firstName: string;
  lastName: string;
  phone: string;
  bloodType: BloodType;
};

export enum AppointmentStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  NOSHOW = "NOSHOW",
}
