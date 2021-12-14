import * as admin from "firebase-admin";
import { Collections, CoordinatorRole } from "@zm-blood-components/common";
import { DbCoordinator, DbDonor } from "../function-types";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import * as DonorDAL from "../dal/DonorDataAccessLayer";

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
  adminId: string
): Promise<DbDonor[]> {
  // check that the coordinator has permissions to this donor
  const coordinator = await getCoordinator(adminId);
  if (!coordinator) {
    console.error("Could not find calling user", adminId);
    throw Error(`User ${adminId} is not an admin`);
  }

  let donors: DbDonor[] = [];

  switch (coordinator.role) {
    case CoordinatorRole.SYSTEM_USER:
      donors = await DonorDAL.getAllDonors();
      break;
    case CoordinatorRole.ZM_COORDINATOR:
    // TODO should ZM_COORDINATOR also get donors that are in their group?
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (coordinator.hospitals) {
        donors = await DonorDAL.getDonorsByLastBookedHospital(
          coordinator.hospitals
        );
      }
      break;
    case CoordinatorRole.GROUP_COORDINATOR:
      const groupIds = await GroupDAL.getGroupIdsOfCoordinatorId(
        coordinator.id
      );
      donors = await DonorDAL.getDonorsByGroupIds(groupIds);
      break;
  }

  return donors;
}
