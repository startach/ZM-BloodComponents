import * as admin from "firebase-admin";
import {
  Collections,
  CoordinatorRole,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { DbCoordinator, DbDonor } from "../function-types";
import * as DonorDAL from "./DonorDataAccessLayer";

export async function getCoordinator(adminId: string) {
  const collection = admin.firestore().collection(Collections.COORDINATORS);
  const adminUser = await collection.doc(adminId).get();

  if (!adminUser.exists) {
    return undefined;
  }

  return adminUser.data() as DbCoordinator;
}

export async function setAdmin(adminUser: DbCoordinator) {
  const collection = admin.firestore().collection(Collections.COORDINATORS);
  await collection.doc(adminUser.id).set(adminUser);
}

export async function deleteAdmin(adminId: string) {
  const collection = admin.firestore().collection(Collections.COORDINATORS);
  await collection.doc(adminId).delete();
}

export async function getCoordinatorDonors(
  coordinatorId: string
): Promise<DbDonor[]> {
  // check that the coordinator has permissions to this donor
  const coordinator = await getCoordinator(coordinatorId);
  if (!coordinator) {
    console.error("Could not find calling user", coordinatorId);
    throw Error(`User ${coordinatorId} is not an admin`);
  }

  let donors: DbDonor[] = [];

  switch (coordinator.role) {
    case CoordinatorRole.SYSTEM_USER:
      donors = await DonorDAL.getAllDonors();
      break;
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (coordinator.hospitals) {
        donors = await DonorDAL.getDonorsByLastBookedHospital(
          coordinator.hospitals
        );
      }
      break;
    case CoordinatorRole.ADVOCATE:
      break;
  }

  return donors;
}

export function getValidHospitalsOrThrow(
  coordinator: DbCoordinator,
  hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT
): Hospital[] {
  const allActiveHospitalsFiltered =
    hospital === HospitalUtils.ALL_HOSPITALS_SELECT
      ? HospitalUtils.activeHospitals
      : [hospital];

  switch (coordinator.role) {
    case CoordinatorRole.SYSTEM_USER:
    case CoordinatorRole.ADVOCATE:
      return allActiveHospitalsFiltered;
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (hospital === HospitalUtils.ALL_HOSPITALS_SELECT) {
        return coordinator.hospitals;
      }
      if (!coordinator.hospitals.includes(hospital)) {
        console.error(
          `Coordinator ${coordinator.id} ${coordinator.role} ${coordinator.hospitals} missing permissions for ${hospital}`
        );
        throw Error("Coordinator has no permissions for hospital");
      }
      return [hospital];
  }

  throw Error(
    "Error while trying to get coordinator hospital : 'Unfamiliar coordinator role'"
  );
}
