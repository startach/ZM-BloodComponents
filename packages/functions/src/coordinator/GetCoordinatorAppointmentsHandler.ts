import {
  CoordinatorRole,
  DbCoordinator,
  DbDonor,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import { dbAppointmentToAppointmentApiEntry } from "../utils/ApiEntriesConversionUtils";
import { getDonors } from "../dal/DonorDataAccessLayer";
import { getCoordinator } from "../dal/AdminDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";

export default async function (
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  callerId: string
) {
  const hospital = request.hospital;
  const coordinator = await fetchCoordinator(callerId);
  await validate(coordinator, hospital);

  const appointmentsByHospital = await getAppointmentsByHospital(hospital);

  let appointments = appointmentsByHospital.map(
    dbAppointmentToAppointmentApiEntry
  );
  const donorIds: string[] = [];
  appointmentsByHospital.map((appointment) => {
    if (appointment.donorId) {
      donorIds.push(appointment.donorId);
    }
  });

  let donorsInAppointments = await getDonors(donorIds);

  if (coordinator.role === CoordinatorRole.GROUP_COORDINATOR) {
    donorsInAppointments = await filterDonorsInGroup(
      coordinator,
      donorsInAppointments
    );
    appointments = filterAppointmentsForDonors(
      appointments,
      donorsInAppointments
    );
  }

  const res: FunctionsApi.GetCoordinatorAppointmentsResponse = {
    appointments,
    donorsInAppointments,
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

async function validate(coordinator: DbCoordinator, hospital: Hospital) {
  switch (coordinator.role) {
    case CoordinatorRole.SYSTEM_USER:
      return;
    case CoordinatorRole.ZM_COORDINATOR:
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (!coordinator.hospitals?.includes(hospital)) {
        console.error(
          `Coordinator ${coordinator.id} ${coordinator.role} ${coordinator.hospitals} missing permissions for ${hospital}`
        );
        throw Error("Coordinator has no permissions for hospital");
      }
      break;
    case CoordinatorRole.GROUP_COORDINATOR:
      break;
  }
}

async function filterDonorsInGroup(
  coordinator: DbCoordinator,
  donorsInAppointments: DbDonor[]
) {
  const groupIds = await GroupDAL.getGroupIdsOfCoordinatorId(coordinator.id);
  return donorsInAppointments.filter((donor) =>
    groupIds.includes(donor.groupId)
  );
}

function filterAppointmentsForDonors(
  appointments: FunctionsApi.AppointmentApiEntry[],
  donors: DbDonor[]
) {
  const donorIds = new Set(donors.map((donor) => donor.id));
  return appointments.filter(
    (appointment) => appointment.donorId && donorIds.has(appointment.donorId)
  );
}
