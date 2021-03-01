import { BloodType, DbAdmin, Donor, Hospital } from "./types";

// Donor functions:

export const GetAvailableAppointmentsFunctionName = "getAvailableAppointments";
export interface GetAvailableAppointmentsRequest {}

export type AvailableAppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
};

export type BookedAppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
  donorId: string;
  bookingTimeMillis: number;
};

// Represent an appointment, both available and booked
export type AppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;

  // If booked
  donorId?: string;
  bookingTimeMillis?: number;
};

export interface GetAvailableAppointmentsResponse {
  availableAppointments: AvailableAppointmentApiEntry[];
}

export const GetDonorAppointmentsFunctionName = "getDonorAppointments";
export interface GetDonorAppointmentsRequest {
  donorId: string;
  fromMillis?: number;
  toMillis?: number;
}

export interface GetDonorAppointmentsResponse {
  completedAppointments: BookedAppointmentApiEntry[];
  futureAppointments: BookedAppointmentApiEntry[];
}

export const BookAppointmentFunctionName = "bookAppointment";
export interface BookAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentIds: string[];
}
export interface BookAppointmentResponse {
  bookedAppointment: BookedAppointmentApiEntry;
}

export const CancelAppointmentFunctionName = "cancelAppointment";
export interface CancelAppointmentRequest {
  appointmentId: string;
}

export const GetDonorFunctionName = "getDonor";
export interface GetDonorRequest {
  donorId: string;
}

export interface GetDonorResponse {
  donor?: Donor;
}

export const SaveDonorFunctionName = "saveDonor";
export interface SaveDonorRequest {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  phone: string;
  email: string;
  bloodType: BloodType;
}

// Admin functions:
export const AddNewAppointmentsFunctionName = "addNewAppointments";
export interface AddAppointmentsRequest {
  slotsRequests: NewSlotsRequest[];
}

export interface NewSlotsRequest {
  hospital: Hospital;
  donationStartTimeMillis: number;
  slots: number;
}

export const DeleteAppointmentsFunctionName = "deleteAppointments";
export interface DeleteAppointmentRequest {
  appointmentIds: string[];
}

export const SaveAdminFunctionName = "saveAdmin";
export interface SaveAdminRequest {
  admin: DbAdmin;
}

export const GetCoordinatorAppointmentsFunctionName =
  "getCoordinatorAppointments";
export interface GetCoordinatorAppointmentsRequest {
  hospital: Hospital;
}

export interface GetCoordinatorAppointmentsResponse {
  appointments: AppointmentApiEntry[];
  donorsInAppointments: Donor[];
}
