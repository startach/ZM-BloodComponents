import {
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { notifyOnCancelAppointment } from "../notifications/CancelAppointmentNotifier";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { DbAppointment } from "../function-types";

export interface ValidCancelAppointmentResponse {
  isValid: boolean;
  invalidReason?: string;
  appointment?: DbAppointment;
}

export async function cancelAppointment(
  callerId: string,
  request: FunctionsApi.CancelAppointmentRequest,
  shouldNotify: boolean
) {
  const donorId = callerId;

  const { isValid, invalidReason, appointment } =
    await validateCancelAppointment(request.appointmentId, donorId);

  if (!isValid || !appointment) {
    throw new Error(invalidReason);
  }

  if (shouldNotify) {
    const donor = await getDonor(donorId);
    notifyOnCancelAppointment(appointment, donor!).catch((e) =>
      console.error(
        "Error notifying on cancelled appointment",
        appointment.id,
        e
      )
    );
  }

  const updatedAppointment =
    DbAppointmentUtils.removeDonorFromDbAppointment(appointment);

  await setAppointment(updatedAppointment);
}

export async function validateCancelAppointment(
  appointmentId: string,
  donorId: string
): Promise<ValidCancelAppointmentResponse> {
  if (!appointmentId) {
    return { isValid: false, invalidReason: "No appointment to cancel" };
  }
  const appointmentToCancel = await getAppointmentsByIds([appointmentId]);
  if (appointmentToCancel.length !== 1) {
    return { isValid: false, invalidReason: "Appointment not found" };
  }

  const appointment = appointmentToCancel[0];
  if (appointment.donorId !== donorId) {
    return {
      isValid: false,
      invalidReason: "Appointment to be deleted is not booked by donor",
    };
  }

  return { isValid: true, appointment };
}
