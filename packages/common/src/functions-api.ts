import { Appointment, AvailableAppointment, BookedAppointment, HospitalUtils } from ".";
import { BloodType, Coordinator, Donor, Hospital, DonorNotificationSettings, MinimalDonorDetailsForAppointment } from "./types";
export const GetAvailableAppointmentsFunctionName = "getAvailableAppointments";
export interface GetAvailableAppointmentsRequest {
    hospitals?: Hospital[];
    fromMillis?: number;
    toMillis?: number;
}
export interface GetAvailableAppointmentsResponse {
    availableAppointments: AvailableAppointment[];
}

export const GetSharedLinkAppointmentFunctionName = "getSharedLinkAppointment";
export interface GetSharedLinkAppointmentRequest {
    donorId: string;
    shareLink: string;
}
export interface GetSharedLinkAppointmentResponse {
    appointment: BookedAppointment;
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
export const CoordinatorBookAppointmentFunctionName = "coordinatorBookAppointment";
export interface CoordinatorBookAppointmentRequest {
    appointmentIds: string[];
    donorId: string;
    donorDetails?: MinimalDonorDetailsForAppointment;
}
export const DonorBookAppointmentFunctionName = "bookAppointment";
export interface BookAppointmentRequest {
    appointmentIds: string[];
}
export enum BookAppointmentStatus {
    SUCCESS = "SUCCESS",
    NO_AVAILABLE_APPOINTMENTS = "NO_AVAILABLE_APPOINTMENTS",
    HAS_OTHER_DONATION_IN_BUFFER = "HAS_OTHER_DONATION_IN_BUFFER",
    DONOR_DETAILS_REQUIRED = "DONOR_DETAILS_REQUIRED"
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
export interface SwapAppointmentResponse extends BookAppointmentResponse {
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
    birthDate: string;
    phone: string;
    email: string;
    bloodType: BloodType;
    notificationSettings: DonorNotificationSettings;
}
export interface SaveDonorResponse {
    donor: Donor;
}
export const GetCoordinatorFunctionName = "getCoordinator";
export interface GetCoordinatorRequest {
}
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
    onlyRemoveDonor: boolean;
}
export const GetCoordinatorAppointmentsFunctionName = "getCoordinatorAppointments";
export interface GetCoordinatorAppointmentsRequest {
    hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT | undefined;
    earliestStartTimeMillis: number;
    latestStartTimeMillis: number;
}
export interface GetCoordinatorAppointmentsResponse {
    coordinator: Coordinator;
    hospitalFetched: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT;
    appointments: Appointment[];
}
export const GetDonorsFunctionName = "getDonors";
export interface GetDonorsRequest {
}
export interface GetDonorsResponse {
    donors: Donor[];
}
export const GetBookedDonationsInHospitalFunctionName = "getBookedDonationsInHospital";
export interface GetBookedDonationsInHospitalRequest {
    hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT;
    fromDateMillis: number;
    toDateMillis: number;
}
export interface GetBookedDonationsInHospitalResponse {
    donationsWithDonorDetails: BookedAppointment[];
}
