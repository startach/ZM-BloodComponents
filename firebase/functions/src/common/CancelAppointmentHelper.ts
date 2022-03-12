import { DbAppointment } from "../function-types";

export function validateCancelAppointment(
  appointmentToCancel: DbAppointment | undefined,
  donorId: string
) {
  if (!appointmentToCancel) {
    throw new Error("Appointment Undefined");
  }

  if (appointmentToCancel.donorId !== donorId) {
    throw new Error("Appointment to be deleted is not booked by donor");
  }
}
