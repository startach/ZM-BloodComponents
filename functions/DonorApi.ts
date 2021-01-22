// TODO share this code
type Appointment = {
  // Slot + donor
  id: string; // UUID
  // Pre-donor
  creationTime: Date;
  creatorUserId: string;
  donationStartTime: Date;
  hospital: Hospital;
  donationType: DonationType;
  // requestedBloodType?: BloodType;

  // added donor
  donorId?: string;
  bookingTime?: Date;
  confirmationTime?: Date; // Time donor confirmed they will come

  // post donation
};

enum AdminRole {
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

interface BookAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentIds: string[];
}

function bookAppointment(request: BookAppointmentRequest, user: FirebaseUser) {
  // validate appointment is free and donor meets:
  // * No other appointments set for user in a blocking time period
  // * Valid blood type?
  // Book
}

interface CancelAppointmentRequest {
  // Ids of appointments in the time slot, book first one available
  appointmentId: string;
}

function cancelAppointment(
  request: CancelAppointmentRequest,
  user: FirebaseUser
) {
  // validate donor is the user booked in the appointment
  // nullify donor details in appointment
}
