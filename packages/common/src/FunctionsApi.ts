import {DbAdmin, Hospital} from './Types';

// Donor functions:

export interface BookAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentIds: string[];
}

export interface CancelAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentId: string;
}

// Admin functions:
export interface AddAppointmentRequest {
  hospital: Hospital;
  donationStartTime: string;
  slots: number;
}

export interface DeleteAppointmentRequest {
  appointmentIds: string[];
}

export interface SaveAdminRequest {
  admin: DbAdmin;
}