import { Admin, AdminRole, Hospital } from "../Types";
import * as _ from "lodash";
import { getAdmin } from "../firestore/AdminDataAccessLayer";

export async function validateAppointmentEditPermissions(
  userId: string | undefined,
  hospitals: Hospital[]
) {
  if (!userId) {
    throw new Error("User must be authenticated to add new appointments");
  }

  const callingAdmin = await getAdmin(userId);
  if (!callingAdmin) {
    console.error("Could not find calling user", userId);
    throw Error("User is not an admin and can't edit appointments");
  }

  if (!adminAllowedToAddAppointments(callingAdmin, hospitals)) {
    console.error(
      "User",
      userId,
      "role does not allow adding appointments to",
      hospitals
    );
    throw Error("User not authorized to edit appointments of " + hospitals);
  }

  return userId;
}

function adminAllowedToAddAppointments(
  callingAdmin: Admin,
  hospitals: Hospital[]
) {
  for (let roleIndex in callingAdmin.role) {
    switch (callingAdmin.role[roleIndex]) {
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
