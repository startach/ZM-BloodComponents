import { getAvailableAppointments } from "../dal/AppointmentDataAccessLayer";
import {
  AppointmentStatus,
  AvailableAppointment,
  FunctionsApi,
} from "@zm-blood-components/common";

export default async function (
  request: FunctionsApi.GetAvailableAppointmentsRequest
): Promise<FunctionsApi.GetAvailableAppointmentsResponse> {
  const availableAppointments = await getAvailableAppointments();

  const result = availableAppointments.map<AvailableAppointment>(
    (appointment) => ({
      id: appointment.id!,
      booked: false,
      donationStartTimeMillis: appointment.donationStartTime.toMillis(),
      hospital: appointment.hospital,
      status: AppointmentStatus.AVAILABLE,
    })
  );

  return {
    availableAppointments: result,
  };
}
