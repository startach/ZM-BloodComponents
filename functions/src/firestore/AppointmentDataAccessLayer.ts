import * as admin from "firebase-admin";
import { Collections } from "../Collections";
import * as _ from "lodash";

export async function getAppointmentsByIds(appointmentIds: string[]) {
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);

  // Firebase supports up to 10 ids per "in" request
  const chunks = _.chunk(appointmentIds, 10);

  let promisesArray = chunks.map((chunk) =>
    collection.where(admin.firestore.FieldPath.documentId(), "in", chunk).get()
  );

  const snapshots = await Promise.all(promisesArray);
  return _.flatMap(snapshots, (s) => s.docs);
}

export async function getAppointmentsByUserId(userId: string) {
  const appointments = await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("creatorUserId", "==", userId)
    .get();

  return appointments.docs;
}

export async function deleteAppointmentsByIds(appointmentIds: string[]) {
  const batch = admin.firestore().batch();
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);
  appointmentIds.map((id) => batch.delete(collection.doc(id)));
  return await batch.commit();
}
