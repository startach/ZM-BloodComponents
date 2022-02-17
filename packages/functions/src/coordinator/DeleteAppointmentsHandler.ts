import { validateAppointmentEditPermissions } from "./UserValidator";
import * as AppointmentDataAccessLayer from "../dal/AppointmentDataAccessLayer";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";
import { getAppointmentNotificationData } from "../notifications/AppointmentNotificationData";
import * as functions from "firebase-functions";
import {
  NotificationToDonor,
  sendEmailToDonor,
} from "../notifications/NotificationSender";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { setCoordinatorUpdate } from "../dal/UpdatesDataAccessLayer";

export default async function (
  request: FunctionsApi.DeleteAppointmentRequest,
  callerId: string
) {
  const appointmentId = request.appointmentId;

  const appointments = await AppointmentDataAccessLayer.getAppointmentsByIds([
    appointmentId,
  ]);

  if (appointments.length === 0) {
    if (request.onlyRemoveDonor) {
      throw new Error(
        "Cannot remove donor from missing appointment - " +
          request.appointmentId
      );
    }
    functions.logger.warn("No appointment to delete", request.appointmentId);
    return;
  }

  const appointment = appointments[0];
  const appointmentHasRealDonor =
    DbAppointmentUtils.isAppointmentBooked(appointment) &&
    !DbAppointmentUtils.isManualDonorAppointment(appointment);
  const donorPromise = appointmentHasRealDonor
    ? DonorDataAccessLayer.getDonor(appointment.donorId)
    : undefined;

  // validate user is allowed to edit appointments of this hospital
  await validateAppointmentEditPermissions(callerId, appointment.hospital);

  if (request.onlyRemoveDonor) {
    const updatedAppointment =
      DbAppointmentUtils.removeDonorFromDbAppointment(appointment);
    await AppointmentDataAccessLayer.setAppointment(updatedAppointment);
  } else {
    await AppointmentDataAccessLayer.deleteAppointmentsByIds([appointmentId]);
  }

  await setCoordinatorUpdate(appointment.hospital, callerId);

  // Handle notification to the donor
  if (!appointmentHasRealDonor) {
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
