import * as admin from "firebase-admin";
import { Collections } from "../Collections";
import * as _ from "lodash";
import { Appointment } from "../Types";

export async function getAppointmentsByIds(appointmentIds: string[]) {
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);

  // Firebase supports up to 10 ids per "in" request
  const chunks = _.chunk(appointmentIds, 10);

  const promisesArray = chunks.map(
    (chunk) =>
      collection
        .where(admin.firestore.FieldPath.documentId(), "in", chunk)
        .get() as Promise<FirebaseFirestore.QuerySnapshot<Appointment>>
  );

  const snapshots = await Promise.all(promisesArray);
  const docs = _.flatMap(snapshots, (s) => s.docs);
  return _.map(docs, (a) => a.data());
}

export async function getAppointmentsByUserId(userId: string) {
  const appointments = await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("creatorUserId", "==", userId)
    .get();

  return appointments.docs;
}

export async function getAppointmentsByUserIdInTime(
  donorId: string,
  bufferMiddleDate: Date,
  weeksBufferBack: number
) {
  const earliestStartTime = new Date(bufferMiddleDate);
  earliestStartTime.setDate(earliestStartTime.getDate() - 7 * weeksBufferBack);
  const latestStartTime = new Date(bufferMiddleDate);
  latestStartTime.setDate(latestStartTime.getDate() + 7 * weeksBufferBack);

  const appointments = (await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("donorId", "==", donorId)
    .where("donationStartTime", ">=", earliestStartTime)
    .where("donationStartTime", "<=", latestStartTime)
    .get()) as FirebaseFirestore.QuerySnapshot<Appointment>;

  return appointments.docs;
}

export async function deleteAppointmentsByIds(appointmentIds: string[]) {
  const batch = admin.firestore().batch();
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);
  appointmentIds.map((id) => batch.delete(collection.doc(id)));
  return await batch.commit();
}

// export function saveNewAppointment(appointment: Appointment) {
//   if (appointment.id) {
//     throw new Error("Cant save new appointment id");
//   }
//
//   return admin
//     .firestore()
//     .collection(Collections.APPOINTMENTS)
//     .doc()
//     .set(appointment);
// }

export function updateAppointment(appointment: Appointment) {
  if (!appointment.id) {
    throw new Error("Cant save appointment without id");
  }

  return admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .doc(appointment.id)
    .set(appointment);
}
