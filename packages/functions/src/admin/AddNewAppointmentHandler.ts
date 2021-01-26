import { CallableContext } from "firebase-functions/lib/providers/https";
import { Collections } from "../Collections";
import { Hospital, DbAppointment } from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "./UserValidator";
import * as admin from "firebase-admin";

interface AddAppointmentRequest {
  hospital: Hospital;
  donationStartTime: string;
  slots: number;
}

export default async function (
  request: AddAppointmentRequest,
  context: CallableContext
) {
  // validate user is allowed to add appointments to this hospital
  const callingUserId = await validateAppointmentEditPermissions(
    context.auth?.uid,
    [request.hospital]
  );

  const slots = request.slots;

  const newAppointment: DbAppointment = {
    creationTime: admin.firestore.Timestamp.fromDate(new Date()),
    creatorUserId: callingUserId,
    donationStartTime: admin.firestore.Timestamp.fromDate(
      new Date(request.donationStartTime)
    ),
    hospital: request.hospital,
  };

  const batch = admin.firestore().batch();
  const collection = admin.firestore().collection(Collections.APPOINTMENTS);

  for (let i = 0; i < slots; i++) {
    batch.set(collection.doc(), newAppointment);
  }

  await batch.commit();
  return slots;
}
