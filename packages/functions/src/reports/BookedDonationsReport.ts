import {
  BookedDonationWithDonor,
  DbAppointment,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "../coordinator/UserValidator";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import { getDonors } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetBookedDonationsInHospitalRequest,
  callerId: string
): Promise<FunctionsApi.GetBookedDonationsInHospitalResponse> {
  await validateAppointmentEditPermissions(
    callerId,
    new Set<Hospital>([request.hospital])
  );

  const appointments: DbAppointment[] = await getAppointmentsByHospital(
    request.hospital,
    new Date(request.fromDateMillis),
    new Date(request.toDateMillis),
    true
  );

  const donorsInAppointments = await getDonors(
    appointments.map((a) => a.donorId)
  );

  let bookedDonationsWithDonor: BookedDonationWithDonor[] = [];
  appointments.forEach((appointment) => {
    const donor = donorsInAppointments.find(
      (d) => d.id === appointment.donorId
    );
    if (donor) {
      const donationWithDonor = {
        donationId: appointment.id || "",
        donationStartTimeMillis: appointment.donationStartTime.toMillis(),
        hospital: appointment.hospital,
        firstName: donor.firstName,
        lastName: donor.lastName,
        phone: donor.phone,
        bloodType: donor.bloodType,
      };
      bookedDonationsWithDonor.push(donationWithDonor);
    }
  });

  return {
    donations: bookedDonationsWithDonor,
  };
}
