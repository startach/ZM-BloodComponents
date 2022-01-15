import { FunctionsApi } from "@zm-blood-components/common";
import {
  getCoordinator,
  getValidHospitalsOrThrow,
} from "../dal/AdminDataAccessLayer";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import { DbAppointment } from "../function-types";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.GetBookedDonationsInHospitalRequest,
  callerId: string
): Promise<FunctionsApi.GetBookedDonationsInHospitalResponse> {
  const coordinator = await getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User ${callerId} is not an admin`);
  }

  const hospitals = getValidHospitalsOrThrow(coordinator, request.hospital);

  const appointments: DbAppointment[] = await getAppointmentsByHospital(
    hospitals,
    new Date(request.fromDateMillis),
    new Date(request.toDateMillis)
  );

  const bookedAppointments = appointments.filter(
    DbAppointmentUtils.isAppointmentBooked
  );
  const bookedDonationWithDonorDetailsPromises = bookedAppointments.map(
    DbAppointmentUtils.toBookedDonationWithDonorDetails
  );
  const bookedDonationsWithDonor = await Promise.all(
    bookedDonationWithDonorDetailsPromises
  );

  return {
    donationsWithDonorDetails: bookedDonationsWithDonor,
  };
}
