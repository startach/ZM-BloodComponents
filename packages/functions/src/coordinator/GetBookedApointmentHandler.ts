import {
  BloodType,
  BookedDonationWithDonorDetails,
  FunctionsApi,
  Hospital,
  MANUAL_DONOR_ID,
} from "@zm-blood-components/common";
import * as AdminDataAccessLayer from "../dal/AdminDataAccessLayer";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import * as AppointmentDataAccessLayer from "../dal/AppointmentDataAccessLayer";
import { isAppointmentAvailable } from "../utils/DbAppointmentUtils";
import { DbAppointment, DbCoordinator } from "../function-types";
import { validateAppointmentPermissions } from "./UserValidator";

export default async function (
  request: FunctionsApi.GetBookedAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.GetBookedAppointmentResponse> {
  const coordinator = await AdminDataAccessLayer.getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User ${callerId} is not an admin`);
  }

  const appointments = await AppointmentDataAccessLayer.getAppointmentsByIds([
    request.appointmentId,
  ]);
  if (appointments.length !== 1) {
    console.error(
      "Unexpected number of appointments, expected 1 got:",
      appointments
    );
    throw Error(`Unexpected number of appointments`);
  }

  const appointment = appointments[0];
  validateAppointment(appointment, coordinator);

  let firstName: string;
  let lastName: string;
  let phone: string;
  let bloodType: BloodType;
  if (appointment.donorId === MANUAL_DONOR_ID) {
    firstName = appointment.donorDetails!.firstName;
    lastName = appointment.donorDetails!.lastName;
    phone = appointment.donorDetails!.phoneNumber;
    bloodType = appointment.donorDetails!.bloodType;
  } else {
    const donor = await DonorDataAccessLayer.getDonor(appointment.donorId);
    if (!donor) {
      throw new Error("Could not find donor for booked appointment");
    }
    firstName = donor.firstName;
    lastName = donor.lastName;
    phone = donor.phone;
    bloodType = donor.bloodType;
  }

  const bookedAppointment: BookedDonationWithDonorDetails = {
    appointmentId: appointment.id!,
    donorId: appointment.donorId,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
    bookingTimeMillis: appointment.bookingTime!.toMillis(),
    hospital: appointment.hospital,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    bloodType: bloodType,
    status: appointment.status,
  };

  return {
    bookedAppointment: bookedAppointment,
  };
}

function validateAppointment(
  appointment: DbAppointment,
  coordinator: DbCoordinator
) {
  if (isAppointmentAvailable(appointment)) {
    throw Error(`Appointment is not booked`);
  }
  validateAppointmentPermissions(
    new Set<Hospital>([appointment.hospital]),
    coordinator
  );
}
