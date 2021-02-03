import { getDonorOrThrow } from "../dal/DonorDataAccessLayer";
import { getAvailableAppointments } from "../dal/AppointmentDataAccessLayer";
import {
  AvailableAppointment,
  FunctionsApi,
} from "@zm-blood-components/common";

export default async function (
  request: FunctionsApi.GetAvailableAppointmentsRequest,
  callerId: string
): Promise<FunctionsApi.GetAvailableAppointmentsResponse> {
  await getDonorOrThrow(callerId);

  const availableAppointments = await getAvailableAppointments();

  const result: AvailableAppointment[] = availableAppointments.map(
    (appointment) => ({
      id: appointment.id,
      donationStartTime: appointment.donationStartTime.toDate(),
      hospital: appointment.hospital,
    })
  );

  return {
    availableAppointments: result,
  };
}
