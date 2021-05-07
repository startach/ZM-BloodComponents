import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "./UserValidator";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import { dbAppointmentToAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";
import { getDonors } from "../dal/DonorDataAccessLayer";

export default async function (
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  callerId: string
) {
  // validate user is allowed to fetch appointments of this hospital
  const hospital = request.hospital;

  await validateAppointmentEditPermissions(
    callerId,
    new Set<Hospital>([hospital])
  );

  const appointmentsByHospital = await getAppointmentsByHospital(hospital);

  const appointments = appointmentsByHospital.map(
    dbAppointmentToAppointmentApiEntry
  );
  const donorIds: string[] = [];
  appointmentsByHospital.map((appointment) => {
    if (appointment.donorId) {
      donorIds.push(appointment.donorId);
    }
  });

  const donorsInAppointments = await getDonors(donorIds);

  const res: FunctionsApi.GetCoordinatorAppointmentsResponse = {
    appointments,
    donorsInAppointments,
  };
  return res;
}
