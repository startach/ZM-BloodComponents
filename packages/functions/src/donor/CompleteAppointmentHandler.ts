import {
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { dbAppointmentToBookedAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.CompleteAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.CompleteAppointmentResponse> {
  const donorId = callerId;

  if (!request.appointmentId) {
    throw new Error("No appointment to complete");
  }
  return await completeAppointmentFunc(
    request.appointmentId,
    donorId,
    request.isNoshow
  );
}

export async function completeAppointmentFunc(
  appointmentId: string,
  donorId: string,
  isNoshow: boolean
): Promise<FunctionsApi.CompleteAppointmentResponse> {
  const appointmentToComplete = await getAppointmentsByIds([appointmentId]);

  if (appointmentToComplete.length !== 1) {
    throw new Error("Appointment not found");
  }

  const appointment = appointmentToComplete[0];
  if (appointment.donorId !== donorId) {
    throw new Error("Appointment to be completed is not booked by donor");
  }

  // TODO add notification

  const updatedAppointment =
    DbAppointmentUtils.completeArrivedFromDbAppointment(appointment, isNoshow);

  await setAppointment(updatedAppointment);

  return {
    completedAppointment:
      dbAppointmentToBookedAppointmentApiEntry(updatedAppointment),
  };
}
