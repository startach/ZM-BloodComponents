import * as admin from "firebase-admin";
import * as _ from "lodash";
import {
  AppointmentStatus,
  BookingChange,
  Collections,
  DbAppointment,
  Hospital,
} from "@zm-blood-components/common";

export async function getAppointmentsByIds(
  appointmentIds: string[]
): Promise<DbAppointment[]> {
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
  return _.map(docs, (a) => ({
    ...a.data(),
    id: a.id,
  }));
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

  return await getAppointments(donorId, {
    fromTime: earliestStartTime,
    toTime: latestStartTime,
  });
}

export async function getAppointments(
  donorId: string,
  options: { fromTime?: Date; toTime?: Date }
): Promise<DbAppointment[]> {
  let request = admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("donorId", "==", donorId);

  if (options.fromTime) {
    request = request.where("donationStartTime", ">=", options.fromTime);
  }
  if (options.toTime) {
    request = request.where("donationStartTime", "<=", options.toTime);
  }

  request = request.orderBy("donationStartTime");

  const appointments =
    (await request.get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return appointments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getAppointmentsByHospital(
  hospital: Hospital,
  fromTime?: Date,
  toTime?: Date
): Promise<DbAppointment[]> {
  let request = admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("hospital", "==", hospital);

  if (fromTime) {
    request = request.where("donationStartTime", ">=", fromTime);
  }
  if (toTime) {
    request = request.where("donationStartTime", "<=", toTime);
  }
  request = request.orderBy("donationStartTime");

  const appointments =
    (await request.get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

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
    .where("status", "==", AppointmentStatus.AVAILABLE)
    .where("donationStartTime", ">", now)
    .orderBy("donationStartTime")
    .get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return appointments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getAllAppointments() {
  const appointments = (await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
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

export function setAppointment(appointment: DbAppointment) {
  if (!appointment.id) {
    throw new Error("Cant save appointment without id");
  }

  return admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .doc(appointment.id)
    .set(appointment);
}

export function removeDonorFromDbAppointment(
  appointment: DbAppointment
): DbAppointment {
  const { donorId, bookingTime, confirmationTime, ...otherProperties } =
    appointment;
  return {
    ...otherProperties,
    donorId: "",
    lastChangeTime: admin.firestore.Timestamp.now(),
    lastChangeType: BookingChange.CANCELLED,
    status: AppointmentStatus.AVAILABLE,
  };
}

export function completeArrivedFromDbAppointment(
  appointment: DbAppointment
): DbAppointment {
  appointment.donationDoneTimeMillis = admin.firestore.Timestamp.now();
  appointment.lastChangeTime = admin.firestore.Timestamp.now();
  appointment.lastChangeType = BookingChange.COMPLETED;
  appointment.status = AppointmentStatus.COMPLETED;
  return appointment;
}
