import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "./UserValidator";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import {
  dbAppointmentToAvailableAppointmentApiEntry,
  dbAppointmentToBookedAppointmentApiEntry,
} from "../utils/ApiEntriesConversionUtils";

export default async function (
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  callerId: string
) {
  // validate user is allowed to fetch appointments of this hospital          dbAppointmentToBookedAppointment(dbAppointmentToAvailableAppointmentApiEntry(appointment))
  const hospital = request.hospital;

  await validateAppointmentEditPermissions(
    callerId,
    new Set<Hospital>([hospital])
  );

  const appointmentsByHospital = await getAppointmentsByHospital(hospital);

  const res: FunctionsApi.GetCoordinatorAppointmentsResponse = {
    availableAppointments: [],
    bookedAppointments: [],
  };

  appointmentsByHospital.map((appointment) => {
    if (appointment.donorId) {
      res.bookedAppointments.push(
        dbAppointmentToBookedAppointmentApiEntry(appointment)
      );
    } else {
      res.availableAppointments.push(
        dbAppointmentToAvailableAppointmentApiEntry(appointment)
      );
    }
  });

  return res;
}
