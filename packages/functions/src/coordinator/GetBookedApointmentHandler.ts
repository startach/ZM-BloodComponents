import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import * as AdminDataAccessLayer from "../dal/AdminDataAccessLayer";
import * as AppointmentDataAccessLayer from "../dal/AppointmentDataAccessLayer";
import {
  isAppointmentAvailable,
  toBookedDonationWithDonorDetails,
} from "../utils/DbAppointmentUtils";
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

  const bookedAppointment = await toBookedDonationWithDonorDetails(appointment);

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
