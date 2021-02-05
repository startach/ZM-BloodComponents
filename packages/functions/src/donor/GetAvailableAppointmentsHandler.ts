import { getDonorOrThrow } from "../dal/DonorDataAccessLayer";
import { getAvailableAppointments } from "../dal/AppointmentDataAccessLayer";
import { FunctionsApi } from "@zm-blood-components/common";

export default async function (
  request: FunctionsApi.GetAvailableAppointmentsRequest,
  callerId: string
): Promise<FunctionsApi.GetAvailableAppointmentsResponse> {
  await getDonorOrThrow(callerId);

  const availableAppointments = await getAvailableAppointments();

  const result = availableAppointments.map((appointment) => {
    return {
      id: appointment.id,
      donationStartTimeMillis: appointment.donationStartTime.toMillis(),
      hospital: appointment.hospital,
    };
  });

  return {
    availableAppointments: result,
  };
}
