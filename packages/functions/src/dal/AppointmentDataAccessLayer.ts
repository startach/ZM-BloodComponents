import * as admin from "firebase-admin";
import * as _ from "lodash";
import {
  AppointmentStatus,
  Collections,
  Hospital,
} from "@zm-blood-components/common";
import { DbAppointment } from "../function-types";

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
  return _.flatMap(snapshots, (s) => toDbAppointments(s));
}

export async function getAppointmentByIdOrThrow(
  appointmentId: string
): Promise<DbAppointment> {
  const foundAppointments = await getAppointmentsByIds([appointmentId]);
  const appointment = foundAppointments[0];

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
}

export async function getAppointmentsCreatedByUserId(userId: string) {
  const appointments = (await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("creatorUserId", "==", userId)
    .get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return toDbAppointments(appointments);
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

  return toDbAppointments(appointments);
}

export async function getAppointmentsByHospital(
  hospitals: Hospital[],
  fromTime?: Date,
  toTime?: Date
): Promise<DbAppointment[]> {
  let request = admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("hospital", "in", hospitals);

  if (fromTime) {
    request = request.where("donationStartTime", ">=", fromTime);
  }
  if (toTime) {
    request = request.where("donationStartTime", "<=", toTime);
  }
  request = request.orderBy("donationStartTime");

  const appointments =
    (await request.get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return toDbAppointments(appointments);
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

  return toDbAppointments(appointments);
}

export async function getAppointmentsByStatus(
  status: AppointmentStatus,
  fromTime?: Date,
  toTime?: Date
) {
  let request = admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("status", "==", status);

  if (fromTime) {
    request = request.where("donationStartTime", ">=", fromTime);
  }
  if (toTime) {
    request = request.where("donationStartTime", "<", toTime);
  }
  request = request.orderBy("donationStartTime");

  const appointments =
    (await request.get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return toDbAppointments(appointments);
}

export async function getAllAppointments() {
  const appointments = (await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .get()) as FirebaseFirestore.QuerySnapshot<DbAppointment>;

  return toDbAppointments(appointments);
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

function toDbAppointments(
  appointments: FirebaseFirestore.QuerySnapshot<DbAppointment>
): DbAppointment[] {
  return appointments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
