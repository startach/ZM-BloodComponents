import * as admin from "firebase-admin";
import { Collections, DbCoordinator } from "@zm-blood-components/common";

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
