import {
  Appointment,
  AvailableAppointment,
  BookedAppointment,
  HospitalUtils,
} from ".";
import {
  BloodType,
  Coordinator,
  Donor,
  Hospital,
  DonorNotificationSettings,
  MinimalDonorDetailsForAppointment,
} from "./types";

// Donor functions:

export const GetAvailableAppointmentsFunctionName = "getAvailableAppointments";
export interface GetAvailableAppointmentsRequest {}
export interface GetAvailableAppointmentsResponse {
  availableAppointments: AvailableAppointment[];
}

export const GetDonorAppointmentsFunctionName = "getDonorAppointments";
export interface GetDonorAppointmentsRequest {
  donorId: string;
  fromMillis?: number;
  toMillis?: number;
}

export interface GetDonorAppointmentsResponse {
  donor?: Donor;
  completedAppointments: BookedAppointment[];
  futureAppointments: BookedAppointment[];
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
  HAS_OTHER_DONATION_IN_BUFFER = "HAS_OTHER_DONATION_IN_BUFFER", // Status not used
  DONOR_DETAILS_REQUIRED = "DONOR_DETAILS_REQUIRED",
}

export interface BookAppointmentResponse {
  status: BookAppointmentStatus;
  bookedAppointment?: BookedAppointment;
}
export const DonorSwapAppointmentFunctionName = "swapAppointment";

export interface SwapAppointmentRequest {
  cancelAppointmentId: string;
  bookAppointmentIds: string[];
}
export interface SwapAppointmentResponse extends BookAppointmentResponse {}

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
  completedAppointment: BookedAppointment;
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
  hospital: Hospital;
  donationStartTimes: number[];
}
export interface AddAppointmentsResponse {
  newAppointments: AvailableAppointment[];
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
  latestStartTimeMillis: number;
}

export interface GetCoordinatorAppointmentsResponse {
  appointments: Appointment[];
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
  donationsWithDonorDetails: BookedAppointment[];
}
