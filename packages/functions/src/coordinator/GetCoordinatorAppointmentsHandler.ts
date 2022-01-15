import {
  AppointmentUtils,
  CoordinatorRole,
  FunctionsApi,
} from "@zm-blood-components/common";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import {
  dbAppointmentToAppointmentApiEntry,
  dbDonorToDonor,
} from "../utils/ApiEntriesConversionUtils";
import {
  getCoordinator,
  getValidHospitalsOrThrow,
} from "../dal/AdminDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import { DbCoordinator, DbDonor } from "../function-types";
import _ from "lodash";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import { isManualDonorAppointment } from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  callerId: string
) {
  const hospital = request.hospital;
  const coordinator = await fetchCoordinator(callerId);
  const hospitalsArray = getValidHospitalsOrThrow(coordinator, hospital);

  const startTimeFilter = new Date(request.earliestStartTimeMillis);
  const endTimeFilter = request.latestStartTimeMillis
    ? new Date(request.latestStartTimeMillis)
    : undefined;
  const appointmentsByHospital = await getAppointmentsByHospital(
    hospitalsArray,
    startTimeFilter,
    endTimeFilter
  );

  const donorIds: string[] = [];
  appointmentsByHospital.map((appointment) => {
    if (appointment.donorId && !isManualDonorAppointment(appointment)) {
      donorIds.push(appointment.donorId);
    }
  });

  let donorsInAppointments = await DonorDataAccessLayer.getDonors(
    _.uniq(donorIds)
  );

  let appointments = appointmentsByHospital.map((a) =>
    dbAppointmentToAppointmentApiEntry(a, donorsInAppointments)
  );
  if (coordinator.role === CoordinatorRole.GROUP_COORDINATOR) {
    donorsInAppointments = await filterDonorsInGroup(
      coordinator,
      donorsInAppointments
    );
    appointments = filterAppointmentsForDonors(
      appointments,
      donorsInAppointments,
      coordinator.id
    );
  }

  const res: FunctionsApi.GetCoordinatorAppointmentsResponse = {
    appointments,
    donorsInAppointments: donorsInAppointments.map(dbDonorToDonor),
  };
  return res;
}

async function fetchCoordinator(callerId: string) {
  const coordinator = await getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error("User is not an coordinator and can't edit appointments");
  }
  return coordinator;
}

async function filterDonorsInGroup(
  coordinator: DbCoordinator,
  donorsInAppointments: DbDonor[]
) {
  const groupIds = await GroupDAL.getGroupIdsOfCoordinatorId(coordinator.id);
  return donorsInAppointments.filter((donor) => groupIds.has(donor.groupId));
}

function filterAppointmentsForDonors(
  appointments: FunctionsApi.AppointmentApiEntry[],
  donors: DbDonor[],
  assigningCoordinatorId: string
) {
  const donorIds = new Set(donors.map((donor) => donor.id));
  return appointments.filter((appointment) => {
    if (!appointment.donorId) return false;

    // if donor is in coordinator group, show the appointment
    if (donorIds.has(appointment.donorId)) return true;

    // if the appointment was manually added by the coordinator
    if (
      AppointmentUtils.isManualDonor(appointment.donorId) &&
      appointment.assigningCoordinatorId === assigningCoordinatorId
    ) {
      return true;
    }

    return false;
  });
}
