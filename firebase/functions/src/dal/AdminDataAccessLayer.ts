import * as admin from "firebase-admin";
import {
  Collections,
  CoordinatorRole,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { DbCoordinator } from "../function-types";

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
