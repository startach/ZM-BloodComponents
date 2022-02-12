import {
  Appointment,
  AppointmentUtils,
  Coordinator,
  CoordinatorRole,
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { getAppointmentsByHospital } from "../dal/AppointmentDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import { DbDonor } from "../function-types";
import _ from "lodash";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import * as functions from "firebase-functions";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import { getCoordinatorHospitals } from "../utils/CoordinatorUtils";

export default async function (
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  callerId: string
) {
  const coordinator = await fetchCoordinator(callerId);
  const hospital = getHospitalToFetchAppointmentsFor(request, coordinator);
  const hospitalsArray = CoordinatorDAL.getValidHospitalsOrThrow(
    coordinator,
    hospital
  );

  const startTimeFilter = new Date(request.earliestStartTimeMillis);
  const endTimeFilter = new Date(request.latestStartTimeMillis);
  const appointmentsByHospital = await getAppointmentsByHospital(
    hospitalsArray,
    startTimeFilter,
    endTimeFilter
  );

  const donorIds: string[] = [];
  appointmentsByHospital.map((appointment) => {
    if (
      appointment.donorId &&
      !DbAppointmentUtils.isManualDonorAppointment(appointment)
    ) {
      donorIds.push(appointment.donorId);
    }
  });

  let donorsInAppointments = await DonorDataAccessLayer.getDonors(
    _.uniq(donorIds)
  );

  let appointments = appointmentsByHospital.map((a) => {
    if (DbAppointmentUtils.isAppointmentBooked(a)) {
      const getDonor = (donorId: string) =>
        donorsInAppointments.filter((d) => d.id === donorId)[0];
      return DbAppointmentUtils.toBookedAppointmentSync(a, getDonor);
    } else {
      return DbAppointmentUtils.toAvailableAppointment(a);
    }
  });

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
    coordinator,
    hospitalFetched: hospital,
    appointments,
  };
  return res;
}

async function fetchCoordinator(callerId: string): Promise<Coordinator> {
  const getCoordinatorDonorUser = DonorDataAccessLayer.getDonor(callerId);
  const coordinator = await CoordinatorDAL.getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User is not a coordinator`);
  }

  const coordinatorDonorUser = await getCoordinatorDonorUser;

  return {
    id: callerId,
    role: coordinator.role,
    activeHospitalsForCoordinator: getCoordinatorHospitals(coordinator),
    name: coordinatorDonorUser
      ? `${coordinatorDonorUser.firstName} ${coordinatorDonorUser.lastName}`
      : undefined,
  };
}

async function filterDonorsInGroup(
  coordinator: Coordinator,
  donorsInAppointments: DbDonor[]
) {
  const groupIds = await GroupDAL.getGroupIdsOfCoordinatorId(coordinator.id);
  return donorsInAppointments.filter((donor) => groupIds.has(donor.groupId));
}

function filterAppointmentsForDonors(
  appointments: Appointment[],
  donors: DbDonor[],
  assigningCoordinatorId: string
) {
  const donorIds = new Set(donors.map((donor) => donor.id));
  return appointments.filter((appointment) => {
    if (!appointment.booked) return false;

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

function getHospitalToFetchAppointmentsFor(
  request: FunctionsApi.GetCoordinatorAppointmentsRequest,
  coordinator: Coordinator
): Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT {
  if (request.hospital) {
    return request.hospital;
  }

  if (coordinator.activeHospitalsForCoordinator.length > 0) {
    functions.logger.debug(
      `Providing appointments for first hospital: ${coordinator.activeHospitalsForCoordinator[0]}`
    );
    return coordinator.activeHospitalsForCoordinator[0];
  }

  throw Error("Could not determine hospital for coordinator");
}
