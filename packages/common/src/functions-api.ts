import { HospitalUtils } from ".";
import {
  BloodType,
  BookingChange,
  AppointmentStatus,
  Coordinator,
  Donor,
  Hospital,
  BookedDonationWithDonorDetails,
  DonorNotificationSettings,
  MinimalDonorDetailsForAppointment,
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
  donorDetails?: MinimalDonorDetailsForAppointment;
  assigningCoordinatorId?: string; // Applies only if donor is anonymous (manual donor)
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
  donorId: string;
  bookingTimeMillis: number;
  status: AppointmentStatus;
  recentChangeType?: BookingChange;
  donationDoneTimeMillis?: number; // Time donor confirmed they donated
};

// Represent an appointment, both available and booked
export type AppointmentApiEntry = {
  id: string;
  donationStartTimeMillis: number; // API returns millis
  hospital: Hospital;
  recentChangeType?: BookingChange;

  // If booked
  donorId?: string;
  donorName?: string;
  assigningCoordinatorId?: string; // Applies only if donor is anonymous (manual donor)
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
  donor?: Donor;
  completedAppointments: BookedAppointmentApiEntry[];
  futureAppointments: BookedAppointmentApiEntry[];
}

export const CoordinatorBookAppointmentFunctionName =
  "coordinatorBookAppointment";
export interface CoordinatorBookAppointmentRequest {
  appointmentIds: string[];
  donorId: string; // Can be an id of a donor or MANUAL_DONOR_ID (in types)
  donorDetails?: MinimalDonorDetailsForAppointment; // if donor id is MANUAL_DONOR_ID need to be sent.
}

export const DonorBookAppointmentFunctionName = "bookAppointment";
export interface BookAppointmentRequest {
  appointmentIds: string[];
}

export enum BookAppointmentStatus {
  SUCCESS = "SUCCESS",
  NO_AVAILABLE_APPOINTMENTS = "NO_AVAILABLE_APPOINTMENTS",
  NO_SUCH_APPOINTMENTS = "NO_SUCH_APPOINTMENTS",
  HAS_OTHER_DONATION_IN_BUFFER = "HAS_OTHER_DONATION_IN_BUFFER",
  DONOR_DETAILS_REQUIRED = "DONOR_DETAILS_REQUIRED",
  NO_PERMISSIONS_FOR_DONOR = "NO_PERMISSIONS_FOR_DONOR",
}

export interface BookAppointmentResponse {
  status: BookAppointmentStatus;
  bookedAppointment?: BookedAppointmentApiEntry;
}

export const CancelAppointmentFunctionName = "cancelAppointment";
export interface CancelAppointmentRequest {
  appointmentId: string;
}

export const CompleteAppointmentFunctionName = "completeAppointment";
export interface CompleteAppointmentRequest {
  appointmentId: string;
  isNoshow: boolean;
  callFromCoordinator?: boolean;
}

export interface CompleteAppointmentResponse {
  completedAppointment: BookedAppointmentApiEntry;
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
  notificationSettings: DonorNotificationSettings;
}
export interface SaveDonorResponse {
  donor: Donor;
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

export const GetCoordinatorAppointmentsFunctionName =
  "getCoordinatorAppointments";
export interface GetCoordinatorAppointmentsRequest {
  hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT;
  earliestStartTimeMillis: number;
  latestStartTimeMillis?: number;
}

export interface GetCoordinatorAppointmentsResponse {
  appointments: AppointmentApiEntry[];
  donorsInAppointments: Donor[]; // TODO remove once coordinator is migrated
}

export const GetDonorsFunctionName = "getDonors";
export interface GetDonorsRequest {}

export interface GetDonorsResponse {
  donors: Donor[];
}
export const GetBookedDonationsInHospitalFunctionName =
  "getBookedDonationsInHospital";
export interface GetBookedDonationsInHospitalRequest {
  hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT;
  fromDateMillis: number;
  toDateMillis: number;
}
export interface GetBookedDonationsInHospitalResponse {
  donationsWithDonorDetails: BookedDonationWithDonorDetails[];
}

export const GetBookedAppointment = "getBookedAppointment";
export interface GetBookedAppointmentRequest {
  appointmentId: string;
}
export interface GetBookedAppointmentResponse {
  bookedAppointment: BookedDonationWithDonorDetails;
}
