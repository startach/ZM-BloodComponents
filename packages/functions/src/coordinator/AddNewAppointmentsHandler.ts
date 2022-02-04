import {
  AppointmentStatus,
  Collections,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "./UserValidator";
import * as admin from "firebase-admin";
import { DbAppointment } from "../function-types";

export default async function (
  request: FunctionsApi.AddAppointmentsRequest,
  callerId: string
) {
  // validate user is allowed to add appointments to this hospital
  const callingUserId = await validateAppointmentEditPermissions(
    callerId,
    request.hospital
  );

  const batch = admin.firestore().batch();

  request.donationStartTimes.map((donationStartTimeMillis) =>
    addAppointmentsToBatch(
      request.hospital,
      donationStartTimeMillis,
      callingUserId,
      batch
    )
  );

  await batch.commit();
}

function addAppointmentsToBatch(
  hospital: Hospital,
  donationStartTimeMillis: number,
  callingUserId: string,
  batch: FirebaseFirestore.WriteBatch
) {
  const newAppointment: DbAppointment = {
    creationTime: admin.firestore.Timestamp.fromDate(new Date()),
    creatorUserId: callingUserId,
    donationStartTime: admin.firestore.Timestamp.fromMillis(
      donationStartTimeMillis
    ),
    hospital: hospital,
    donorId: "",
    status: AppointmentStatus.AVAILABLE,
  };

  const collection = admin.firestore().collection(Collections.APPOINTMENTS);
  batch.set(collection.doc(), newAppointment);
}
