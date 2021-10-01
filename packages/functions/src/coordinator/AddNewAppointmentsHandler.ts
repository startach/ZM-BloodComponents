import {
  AppointmentStatus,
  Collections,
  FunctionsApi,
} from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "./UserValidator";
import * as admin from "firebase-admin";
import { DbAppointment } from "../function-types";

export default async function (
  request: FunctionsApi.AddAppointmentsRequest,
  callerId: string
) {
  // validate user is allowed to add appointments to this hospital
  const requestedHospitals = new Set(
    request.slotsRequests.map((appointment) => appointment.hospital)
  );

  const callingUserId = await validateAppointmentEditPermissions(
    callerId,
    requestedHospitals
  );

  const batch = admin.firestore().batch();

  request.slotsRequests.map((slotsRequest) =>
    addAppointmentsToBatch(slotsRequest, callingUserId, batch)
  );

  await batch.commit();
}

function addAppointmentsToBatch(
  slotsRequest: FunctionsApi.NewSlotsRequest,
  callingUserId: string,
  batch: FirebaseFirestore.WriteBatch
) {
  const slots = slotsRequest.slots;

  const newAppointment: DbAppointment = {
    creationTime: admin.firestore.Timestamp.fromDate(new Date()),
    creatorUserId: callingUserId,
    donationStartTime: admin.firestore.Timestamp.fromDate(
      new Date(slotsRequest.donationStartTimeMillis)
    ),
    hospital: slotsRequest.hospital,
    donorId: "",
    status: AppointmentStatus.AVAILABLE,
  };

  const collection = admin.firestore().collection(Collections.APPOINTMENTS);

  for (let i = 0; i < slots; i++) {
    batch.set(collection.doc(), newAppointment);
  }
}
