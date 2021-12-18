import {
  CoordinatorRole,
  FunctionsApi,
  Hospital,
  MANUAL_DONOR_ID,
} from "@zm-blood-components/common";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import {
  dbAppointmentToAppointmentApiEntry,
  dbDonorToDonor,
} from "../utils/ApiEntriesConversionUtils";
import { getDonors } from "../dal/DonorDataAccessLayer";
import { getCoordinator } from "../dal/AdminDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import { DbCoordinator, DbDonor } from "../function-types";
import _ from "lodash";

export default async function (
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  callerId: string
) {
  const hospital = request.hospital;
  const coordinator = await fetchCoordinator(callerId);
  const hospitalsArray = await getValidHospitalsOrThrow(coordinator, hospital);

  const startTimeFilter = request.earliestStartTimeMillis
    ? new Date(request.earliestStartTimeMillis)
    : undefined;
  const appointmentsByHospital = await getAppointmentsByHospital(
    hospitalsArray,
    startTimeFilter
  );

  let appointments = appointmentsByHospital.map(
    dbAppointmentToAppointmentApiEntry
  );
  const donorIds: string[] = [];
  appointmentsByHospital.map((appointment) => {
    if (appointment.donorId) {
      donorIds.push(appointment.donorId);
    }
  });

  let donorsInAppointments = await getDonors(_.uniq(donorIds));

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

async function getValidHospitalsOrThrow(
  coordinator: DbCoordinator,
  hospital: Hospital | "all"
): Promise<Hospital[]> {
  switch (coordinator.role) {
    case CoordinatorRole.SYSTEM_USER:
    case CoordinatorRole.ZM_COORDINATOR:
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (hospital === "all") {
        return coordinator.hospitals ?? [];
      }
      if (!coordinator.hospitals?.includes(hospital)) {
        console.error(
          `Coordinator ${coordinator.id} ${coordinator.role} ${coordinator.hospitals} missing permissions for ${hospital}`
        );
        throw Error("Coordinator has no permissions for hospital");
      }
      return [hospital];
    case CoordinatorRole.GROUP_COORDINATOR:
      break;
  }

  if (hospital === "all") {
    return Object.values(Hospital);
  } else {
    return [hospital];
  }
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

    // if the appointment was manualy added by the coordinator
    if (
      appointment.donorId === MANUAL_DONOR_ID &&
      appointment.assigningCoordinatorId === assigningCoordinatorId
    ) {
      return true;
    }

    return false;
  });
}
