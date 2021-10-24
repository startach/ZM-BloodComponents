import { validateAppointmentEditPermissions } from "./UserValidator";
import * as AppointmentDataAccessLayer from "../dal/AppointmentDataAccessLayer";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import { getAppointmentNotificationData } from "../notifications/AppointmentNotificationData";
import * as functions from "firebase-functions";
import {
  NotificationToDonor,
  sendEmailToDonor,
} from "../notifications/NotificationSender";

export default async function (
  request: FunctionsApi.DeleteAppointmentRequest,
  callerId: string
) {
  const appointmentId = request.appointmentId;

  const appointments = await AppointmentDataAccessLayer.getAppointmentsByIds([
    appointmentId,
  ]);
  if (appointments.length !== 1) {
    throw new Error("Invalid appointment id");
  }

  const appointment = appointments[0];
  const donorPromise = appointment.donorId
    ? DonorDataAccessLayer.getDonor(appointment.donorId)
    : undefined;

  // validate user is allowed to edit appointments of this hospital
  await validateAppointmentEditPermissions(
    callerId,
    new Set<Hospital>([appointment.hospital])
  );

  if (!request.onlyRemoveDonor) {
    await AppointmentDataAccessLayer.deleteAppointmentsByIds([appointmentId]);
  } else {
    const updatedAppointment =
      DbAppointmentUtils.removeDonorFromDbAppointment(appointment);
    await AppointmentDataAccessLayer.setAppointment(updatedAppointment);
  }

  // Handle notification to the donor
  if (!appointment.donorId) {
    return;
  }

  const donor = await donorPromise;
  if (!donor) {
    functions.logger.error(
      "Could not send deletion email to donor " + appointment.donorId
    );
    return;
  }
  const appointmentNotificationData = getAppointmentNotificationData(
    appointment,
    donor
  );

  await sendEmailToDonor(
    NotificationToDonor.APPOINTMENT_CANCELLED_BY_COORDINATOR,
    appointmentNotificationData,
    donor
  );
}
