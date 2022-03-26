import {
  AppointmentStatus,
  AvailableAppointment,
  Collections,
  FunctionsApi,
} from "@zm-blood-components/common";
import { validateAppointmentEditPermissions } from "./UserValidator";
import * as admin from "firebase-admin";
import { DbAppointment } from "../function-types";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { setCoordinatorUpdate } from "../dal/UpdatesDataAccessLayer";
import { getCoordinator } from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.AddAppointmentsRequest,
  callerId: string
): Promise<FunctionsApi.AddAppointmentsResponse> {
  // validate user is allowed to add appointments to this hospital
  const dbCoordinator = await getCoordinator(callerId);
  const callingUserId = validateAppointmentEditPermissions(
    request.hospital,
    dbCoordinator
  );

  const batch = admin.firestore().batch();

  const appointmentsAdded: AvailableAppointment[] = [];
  request.donationStartTimes.map((donationStartTimeMillis) => {
    const newAppointment: DbAppointment = {
      creationTime: admin.firestore.Timestamp.now(),
      creatorUserId: callerId,
      donationStartTime: admin.firestore.Timestamp.fromMillis(
        donationStartTimeMillis
      ),
      hospital: request.hospital,
      donorId: "",
      status: AppointmentStatus.AVAILABLE,
    };

    const document = admin
      .firestore()
      .collection(Collections.APPOINTMENTS)
      .doc();
    batch.set(document, newAppointment);

    newAppointment.id = document.id;
    appointmentsAdded.push(
      DbAppointmentUtils.toAvailableAppointment(newAppointment)
    );
  });

  await batch.commit();

  await setCoordinatorUpdate(request.hospital, callerId);

  return {
    newAppointments: appointmentsAdded,
  };
}
