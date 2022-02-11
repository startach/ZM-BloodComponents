import { BookedAppointment, FunctionsApi } from "@zm-blood-components/common";
import { getAppointments } from "../dal/AppointmentDataAccessLayer";
import { dbDonorToDonor } from "../utils/ApiEntriesConversionUtils";
import { getDonor } from "../dal/DonorDataAccessLayer";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

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

  const donorPromise = getDonor(request.donorId);
  const appointments = await getAppointments(request.donorId, options);

  const now = new Date();
  const completedAppointments: BookedAppointment[] = [];
  const futureAppointments: BookedAppointment[] = [];
  const dbDonor = await donorPromise;
  if (dbDonor) {
    appointments.map((appointment) => {
      const bookedAppointment = DbAppointmentUtils.toBookedAppointmentSync(
        appointment,
        () => dbDonor
      );

      if (appointment.donationStartTime.toDate() < now) {
        completedAppointments.push(bookedAppointment);
      } else {
        futureAppointments.push(bookedAppointment);
      }
    });
  }

  return {
    donor: dbDonor ? dbDonorToDonor(dbDonor) : undefined,
    completedAppointments,
    futureAppointments,
  };
}
