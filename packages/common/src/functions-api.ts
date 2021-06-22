import {
  BloodType,
  BookedDonationWithDonorDetails,
  BookingChange,
  Coordinator,
  DbCoordinator,
  Donor,
  Hospital,
} from "./types";

// Donor functions:

export const GetAvailableAppointmentsFunctionName = "getAvailableAppointments";
export interface GetAvailableAppointmentsRequest {}

export type AvailableAppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
  recentChangeType?: BookingChange;
};

export type BookedAppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
  donorId: string;
  bookingTimeMillis: number;
  recentChangeType?: BookingChange;
};

// Represent an appointment, both available and booked
export type AppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
  recentChangeType?: BookingChange;

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
export enum BookAppointmentStatus {
  SUCCESS = "SUCCESS",
  NO_AVAILABLE_APPOINTMENTS = "NO_AVAILABLE_APPOINTMENTS",
  NO_SUCH_APPOINTMENTS = "NO_SUCH_APPOINTMENTS",
  HAS_OTHER_DONATION_IN_BUFFER = "HAS_OTHER_DONATION_IN_BUFFER",
}
export interface BookAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentIds: string[];
}
export interface BookAppointmentResponse {
  status: BookAppointmentStatus;
  bookedAppointment?: BookedAppointmentApiEntry;
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

export const DonorStartupFunctionName = "donorStartup";
export interface DonorStartupRequest {}
export interface DonorStartupResponse {
  getDonorResponse: GetDonorResponse;
  getDonorAppointmentsResponse: GetDonorAppointmentsResponse;
  getAvailableAppointmentsResponse: GetAvailableAppointmentsResponse;
}

// Coordinator functions:
export const GetCoordinatorFunctionName = "getCoordinator";
export interface GetCoordinatorRequest {}
export interface GetCoordinatorResponse {
  coordinator: Coordinator;
}

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
  appointmentId: string;
  // If true, will keep the appointment but remove the donor from it.
  // If false, will delete the appointment completely.
  onlyRemoveDonor: boolean;
}

export const SaveCoordinatorFunctionName = "saveCoordinator";
export interface SaveCoordinatorRequest {
  coordinator: DbCoordinator;
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

export const GetDonorsFunctionName = "getDonors";
export interface GetDonorsRequest {}

export interface GetDonorsResponse {
  donors: Donor[];
}
export const GetBookedDonationsInHospitalFunctionName =
  "getBookedDonationsInHospital";
export interface GetBookedDonationsInHospitalRequest {
  hospital: Hospital;
  fromDateMillis: number;
  toDateMillis: number;
}
export interface GetBookedDonationsInHospitalResponse {
  donationsWithDonorDetails: BookedDonationWithDonorDetails[];
}
