import { CallableContext } from "firebase-functions/lib/providers/https";
import { Collections } from "../Collections";
import { Appointment, Hospital } from "../Types";
import { validateAppointmentEditPermissions } from "./UserValidator";

interface AddAppointmentRequest {
  hospital: Hospital;
  donationStartTime: string;
  slots: number;
}

export default async function (
  request: AddAppointmentRequest,
  context: CallableContext,
  db: FirebaseFirestore.Firestore
) {
  // validate user is allowed to add appointments to this hospital
  const callingUserId = await validateAppointmentEditPermissions(
    context.auth?.uid,
    [request.hospital],
    db
  );

  const slots = request.slots;

  const newAppointment: Appointment = {
    creationTime: new Date(),
    creatorUserId: callingUserId,
    donationStartTime: new Date(request.donationStartTime),
    hospital: request.hospital,
  };

  const batch = db.batch();
  const collection = db.collection(Collections.APPOINTMENTS);

  for (let i = 0; i < slots; i++) {
    batch.set(collection.doc(), newAppointment);
  }

  await batch.commit();
  return slots;
}
