import * as admin from "firebase-admin";
import * as _ from "lodash";
import { DbAppointment, Collections } from "@zm-blood-components/common";

export async function getAppointmentsByIds(appointmentIds: string[]) {
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);

  // Firebase supports up to 10 ids per "in" request
  const chunks = _.chunk(appointmentIds, 10);

  const promisesArray = chunks.map(
    (chunk) =>
      collection
        .where(admin.firestore.FieldPath.documentId(), "in", chunk)
        .get() as Promise<FirebaseFirestore.QuerySnapshot<DbAppointment>>
  );

  const snapshots = await Promise.all(promisesArray);
  const docs = _.flatMap(snapshots, (s) => s.docs);
  return _.map(docs, (a) => a.data());
}

export async function getAppointmentsCreatedByUserId(userId: string) {
  const appointments = await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("creatorUserId", "==", userId)
    .get();

  return appointments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DbAppointment[];
}

export async function getAppointmentsByDonorIdInTime(
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
    .get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return appointments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getAvailableAppointments() {
  const now = new Date();

  const appointments = (await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("donorId", "==", null)
    .where("donationStartTime", ">", now)
    .get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return appointments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteAppointmentsByIds(appointmentIds: string[]) {
  const batch = admin.firestore().batch();
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);
  appointmentIds.map((id) => batch.delete(collection.doc(id)));
  return await batch.commit();
}

export function updateAppointment(appointment: DbAppointment) {
  if (!appointment.id) {
    throw new Error("Cant save appointment without id");
  }

  return admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .doc(appointment.id)
    .set(appointment);
}
