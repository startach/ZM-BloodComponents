import { Collections } from "../Collections";
import { Admin, AdminRole, Hospital } from "../Types";
import * as _ from "lodash";

export async function validateAppointmentEditPermissions(
  userId: string | undefined,
  hospitals: Hospital[],
  db: FirebaseFirestore.Firestore
) {
  if (!userId) {
    throw Error("User must be authenticated to add new appointments");
  }

  const callingUser = await db.collection(Collections.ADMIN).doc(userId).get();
  if (!callingUser.exists) {
    console.error("Could not find calling user", userId);
    throw Error("User not admin and can't add appointments");
  }

  const callingAdmin = callingUser.data() as Admin;
  if (!adminAllowedToAddAppointments(callingAdmin, hospitals)) {
    console.error(
      "User",
      userId,
      "role does not allow adding appointments to",
      hospitals
    );
    throw Error("User not authorized to add new appointments to " + hospitals);
  }

  return userId;
}

function adminAllowedToAddAppointments(
  callingAdmin: Admin,
  hospitals: Hospital[]
) {
  for (let role in callingAdmin.role) {
    switch (role) {
      case AdminRole.SYSTEM_USER:
        return true;

      case AdminRole.HOSPITAL_COORDINATOR:
        if (_.intersection(callingAdmin.hospitals, hospitals).length > 0) {
          return true;
        }
    }
  }

  return false;
}
