import { BookedAppointment, FunctionsApi } from "@zm-blood-components/common";
import { getAppointments } from "../dal/AppointmentDataAccessLayer";
import { dbAppointmentToBookedAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.GetDonorAppointmentsRequest,
  callerId: string
): Promise<FunctionsApi.GetDonorAppointmentsResponse> {
  if (callerId !== request.donorId) {
    throw Error("Unauthorized to access user");
  }

  const options: { fromTime?: Date; toTime?: Date } = {};
  if (request.fromMillis) {
    options.fromTime = new Date(request.fromMillis);
  }
  if (request.toMillis) {
    options.toTime = new Date(request.toMillis);
  }

  const appointments = await getAppointments(request.donorId, options);

  const now = new Date();
  const completedAppointments: BookedAppointment[] = [];
  const futureAppointments: BookedAppointment[] = [];
  appointments.map((appointment) => {
    const bookedAppointment =
      dbAppointmentToBookedAppointmentApiEntry(appointment);

    if (appointment.donationStartTime.toDate() < now) {
      completedAppointments.push(bookedAppointment);
    } else {
      futureAppointments.push(bookedAppointment);
    }
  });

  return {
    completedAppointments,
    futureAppointments,
  };
}
