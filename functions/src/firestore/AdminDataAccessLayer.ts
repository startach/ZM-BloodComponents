import * as admin from "firebase-admin";
import { Collections } from "../Collections";
import * as _ from "lodash";
import { Admin } from "../../../admin/src/Types";

export async function getAdmin(adminId: string) {
  const collection = admin.firestore().collection(Collections.ADMIN);
  const adminUser = await collection.doc(adminId).get();

  if (!adminUser.exists) {
    return undefined;
  }

  return adminUser.data() as Admin;
}

export async function deleteAppointmentsByIds(appointmentIds: string[]) {
  const batch = admin.firestore().batch();
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);
  appointmentIds.map((id) => batch.delete(collection.doc(id)));
  return await batch.commit();
}
