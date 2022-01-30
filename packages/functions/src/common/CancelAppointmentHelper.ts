import { DbAppointment } from "../function-types";

export interface ValidCancelAppointmentResponse {
  isValid: boolean;
  invalidReason?: string;
  appointment?: DbAppointment;
}

export async function validateCancelAppointment(
  appointments: DbAppointment[],
  donorId: string
) {
  if (appointments.length !== 1) {
    throw new Error("Appointment not found");
  }

  const appointmentToCancel = appointments[0];
  if (appointmentToCancel.donorId !== donorId) {
    throw new Error("Appointment to be deleted is not booked by donor");
  }

  if (!appointmentToCancel) {
    throw new Error("Appointment Undefined");
  }
  return appointmentToCancel;
}
