import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import * as AdminDataAccessLayer from "../dal/AdminDataAccessLayer";
import { DbAppointment, DbCoordinator } from "../function-types";
import { validateAppointmentPermissions } from "./UserValidator";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.GetBookedAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.GetBookedAppointmentResponse> {
  const coordinator = await AdminDataAccessLayer.getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User ${callerId} is not an admin`);
  }

  const appointment = await DbAppointmentUtils.getAppointmentByIdOrThrow(
    request.appointmentId
  );

  validateAppointment(appointment, coordinator);

  const bookedAppointment = await DbAppointmentUtils.toBookedAppointmentAsync(
    appointment
  );

  return {
    bookedAppointment: bookedAppointment,
  };
}

function validateAppointment(
  appointment: DbAppointment,
  coordinator: DbCoordinator
) {
  if (DbAppointmentUtils.isAppointmentAvailable(appointment)) {
    throw Error(`Appointment is not booked`);
  }
  validateAppointmentPermissions(
    new Set<Hospital>([appointment.hospital]),
    coordinator
  );
}
