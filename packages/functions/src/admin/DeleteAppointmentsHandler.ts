import { validateAppointmentEditPermissions } from "./UserValidator";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import {
  AppointmentUtils,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";

export default async function (
  request: FunctionsApi.DeleteAppointmentRequest,
  callerId: string
) {
  const appointmentId = request.appointmentId;

  const appointments = await getAppointmentsByIds([appointmentId]);
  if (appointments.length !== 1) {
    throw new Error("Invalid appointment id");
  }

  const appointment = appointments[0];

  // validate user is allowed to edit appointments of this hospital
  await validateAppointmentEditPermissions(
    callerId,
    new Set<Hospital>([appointment.hospital])
  );

  if (!request.onlyRemoveDonor) {
    await deleteAppointmentsByIds([appointmentId]);
    return;
  }

  const updatedAppointment = AppointmentUtils.removeDonorFromDbAppointment(
    appointment
  );
  await setAppointment(updatedAppointment);
}
