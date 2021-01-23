import { Admin, AdminRole, Hospital } from "../Types";
import * as _ from "lodash";
import { getAdmin } from "../dal/AdminDataAccessLayer";

export async function validateAppointmentEditPermissions(
  userId: string | undefined,
  hospitals: Hospital[]
) {
  if (!userId) {
    throw new Error("User must be authenticated to edit appointments");
  }

  const admin = await getAdmin(userId);
  if (!admin) {
    console.error("Could not find calling user", userId);
    throw Error("User is not an admin and can't edit appointments");
  }

  if (!adminAllowedToAddAppointments(admin, hospitals)) {
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

function adminAllowedToAddAppointments(admin: Admin, hospitals: Hospital[]) {
  if (admin.roles.includes(AdminRole.SYSTEM_USER)) {
    return true;
  }

  if (admin.roles.includes(AdminRole.HOSPITAL_COORDINATOR)) {
    if (_.intersection(admin.hospitals, hospitals).length == hospitals.length) {
      return true;
    }
  }

  for (const roleIndex in admin.roles) {
    switch (admin.roles[roleIndex]) {
      case AdminRole.SYSTEM_USER:
        return true;

      case AdminRole.HOSPITAL_COORDINATOR:
        if (_.intersection(admin.hospitals, hospitals).length > 0) {
          return true;
        }
    }
  }

  return false;
}
