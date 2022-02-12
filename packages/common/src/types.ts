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

export type MinimalDonorDetailsForAppointment = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bloodType: BloodType;
};

//https://docs.google.com/document/d/1Y3ovMRJhdHlJEd4rS3FCgxxY3qdpmk2WLaR45nL8IT8
export enum CoordinatorRole {
  SYSTEM_USER = "SYSTEM_USER",
  ZM_COORDINATOR = "ZM_COORDINATOR",
  HOSPITAL_COORDINATOR = "HOSPITAL_COORDINATOR",
  GROUP_COORDINATOR = "GROUP_COORDINATOR",
}

export type Coordinator = {
  coordinatorId: string;
  role: CoordinatorRole;
  activeHospitalsForCoordinator: Hospital[];
  name: string | undefined;
};

export enum Hospital {
  TEL_HASHOMER = "TEL_HASHOMER",
  ASAF_HAROFE = "ASAF_HAROFE",
  BEILINSON = "BEILINSON",
  HADASA_EIN_KEREM = "HADASA_EIN_KEREM",
  ICHILOV = "ICHILOV",
  RAMBAM = "RAMBAM",
  SOROKA = "SOROKA",
}

export enum Collections {
  COORDINATORS = "coordinators",
  DONORS = "donors",
  APPOINTMENTS = "appointments",
  GROUPS = "groups",
  UPDATES = "updates",
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
  NOSHOW = "NOSHOW",
}

export type Appointment = AvailableAppointment | BookedAppointment;

type AppointmentBase = {
  id: string;
  donationStartTimeMillis: number;
  hospital: Hospital;
  status: AppointmentStatus;
  recentChangeType?: BookingChange;
};

export type AvailableAppointment = AppointmentBase & {
  booked: false;
};

export type BookedAppointment = AppointmentBase & {
  booked: true;
  donorId: string;
  bookingTimeMillis: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  bloodType: BloodType;
  assigningCoordinatorId?: string; // Applies only if donor is anonymous (manual donor)
};

export enum AppointmentStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  NOSHOW = "NOSHOW",
}

export const MANUAL_DONOR_ID = "manual";

export type CoordinatorUpdate = {
  hospital: Hospital;
  userId: string;
  time: any;
};
