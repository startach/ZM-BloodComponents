import { CallableContext } from "firebase-functions/lib/providers/https";
import { Collections } from "../Collections";
import { validateAppointmentEditPermissions } from "./UserValidator";

interface DeleteAppointmentRequest {
  appointmentIds: string[];
}

export default async function (
  request: DeleteAppointmentRequest,
  context: CallableContext,
  db: FirebaseFirestore.Firestore
) {
  let appointmentIds = request.appointmentIds;
  const collection = db.collection(Collections.APPOINTMENTS);
  const appointments = await collection
    .where("id", "in", [appointmentIds])
    .get();
  const hospitals = appointments.docs.map((doc) => doc.data().hospital);

  // validate user is allowed delete appointments of this hospital
  await validateAppointmentEditPermissions(context.auth?.uid, hospitals, db);

  const batch = db.batch();

  appointmentIds.map((id) => batch.delete(collection.doc(id)));
  await batch.commit();

  return appointmentIds.length;
}
