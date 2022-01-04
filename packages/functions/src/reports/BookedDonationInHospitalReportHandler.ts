import {
  BookedDonationWithDonorDetails,
  FunctionsApi,
} from "@zm-blood-components/common";
import {
  getCoordinator,
  getValidHospitalsOrThrow,
} from "../dal/AdminDataAccessLayer";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import { getDonors } from "../dal/DonorDataAccessLayer";
import { DbAppointment } from "../function-types";

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

  const bookedAppointments = appointments.filter((a) => a.donorId?.length > 0);
  const donorsInAppointments = await getDonors(
    bookedAppointments.map((a) => a.donorId)
  );

  const bookedDonationsWithDonor: BookedDonationWithDonorDetails[] = [];
  bookedAppointments.forEach((appointment) => {
    const donor = donorsInAppointments.find(
      (d) => d.id === appointment.donorId
    );
    const donationWithDonor: BookedDonationWithDonorDetails = {
      appointmentId: appointment.id!,
      donorId: appointment.donorId,
      donationStartTimeMillis: appointment.donationStartTime.toMillis(),
      hospital: appointment.hospital,
      firstName: donor!.firstName,
      lastName: donor!.lastName,
      phone: donor!.phone,
      bloodType: donor!.bloodType,
      status: appointment.status,
    };
    bookedDonationsWithDonor.push(donationWithDonor);
  });

  return {
    donationsWithDonorDetails: bookedDonationsWithDonor,
  };
}
