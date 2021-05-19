import {
  BookedDonationWithDonorDetails,
  DbAppointment,
  FunctionsApi,
} from "@zm-blood-components/common";
import { getCoordinator } from "../dal/AdminDataAccessLayer";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import { getDonors } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetBookedDonationsInHospitalRequest,
  callerId: string
): Promise<FunctionsApi.GetBookedDonationsInHospitalResponse> {
  const coordinator = await getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User ${callerId} is not an admin`);
  }

  // TODO implement switch (coordinator.role) && by requested hospital

  const appointments: DbAppointment[] = await getAppointmentsByHospital(
    request.hospital,
    new Date(request.fromDateMillis),
    new Date(request.toDateMillis)
  );

  const bookedAppointments = appointments.filter((a) => a.donorId?.length > 0);
  const donorsInAppointments = await getDonors(
    bookedAppointments.map((a) => a.donorId)
  );

  let bookedDonationsWithDonor: BookedDonationWithDonorDetails[] = [];
  bookedAppointments.forEach((appointment) => {
    const donor = donorsInAppointments.find(
      (d) => d.id === appointment.donorId
    );
    const donationWithDonor: BookedDonationWithDonorDetails = {
      appointmentId: appointment.id!,
      donationStartTimeMillis: appointment.donationStartTime.toMillis(),
      hospital: appointment.hospital,
      firstName: donor!.firstName,
      lastName: donor!.lastName,
      phone: donor!.phone,
      bloodType: donor!.bloodType,
    };
    bookedDonationsWithDonor.push(donationWithDonor);
  });

  return {
    donationsWithDonorDetails: bookedDonationsWithDonor,
  };
}
