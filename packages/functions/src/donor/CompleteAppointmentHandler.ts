import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import * as AppointmentDataAccessLayer from "../dal/AppointmentDataAccessLayer";
import { AppointmentStatus, FunctionsApi } from "@zm-blood-components/common";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { validateAppointmentEditPermissions } from "../coordinator/UserValidator";
import { MANUAL_DONOR_ID } from "@zm-blood-components/common/src";

export default async function (
  request: FunctionsApi.CompleteAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.CompleteAppointmentResponse> {
  // TODO : fix this API. the caller is not always the donor
  const donorId = callerId;
  const coordinatorId = request.callFromCoordinator ? callerId : undefined;

  if (!request.appointmentId) {
    throw new Error("No appointment to complete");
  }
  return await completeAppointmentFunc(
    request.appointmentId,
    donorId,
    request.isNoshow,
    coordinatorId
  );
}

export async function completeAppointmentFunc(
  appointmentId: string,
  donorId: string,
  isNoshow: boolean,
  coordinatorId?: string
): Promise<FunctionsApi.CompleteAppointmentResponse> {
  const appointment =
    await AppointmentDataAccessLayer.getAppointmentByIdOrThrow(appointmentId);

  if (coordinatorId) {
    await validateAppointmentEditPermissions(
      coordinatorId,
      appointment.hospital
    );
  } else if (appointment.donorId !== donorId) {
    throw new Error("Appointment to be completed is not booked by donor");
  }

  switch (appointment.status) {
    case AppointmentStatus.AVAILABLE:
      throw new Error("Invalid appointment status - " + appointment.status);
    case AppointmentStatus.COMPLETED:
    case AppointmentStatus.NOSHOW:
      // Coordinators can change status of completed appointments
      if (!coordinatorId) {
        throw new Error("Invalid appointment status - " + appointment.status);
      }

    case AppointmentStatus.BOOKED:
    case AppointmentStatus.CONFIRMED:
  }

  const updatedAppointment =
    DbAppointmentUtils.completeArrivedFromDbAppointment(appointment, isNoshow);

  await AppointmentDataAccessLayer.setAppointment(updatedAppointment);

  const completedAppointment =
    await DbAppointmentUtils.toBookedAppointmentAsync(updatedAppointment);
  
  const currentAppointmentDonorId = appointment.donorId;

  if (updatedAppointment.status == AppointmentStatus.COMPLETED && 
    currentAppointmentDonorId != MANUAL_DONOR_ID) {

    const donor = await DonorDAL.getDonor(currentAppointmentDonorId);
    const lastCompletedAppointment = donor?.lastCompletedDonationTime;
    const appointmentCompletionTime = updatedAppointment.donationDoneTimeMillis || admin.firestore.Timestamp.now();

    const shouldUpdateCompletion = lastCompletedAppointment ? 
    lastCompletedAppointment < appointmentCompletionTime : true;

    if (shouldUpdateCompletion)
    {
      await DonorDAL.updateDonor(currentAppointmentDonorId, { lastCompletedDonationTime: appointmentCompletionTime});
    }
  }

  return {
    completedAppointment,
  };
}
