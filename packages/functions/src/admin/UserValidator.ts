import { DbAdmin, AdminRole, Hospital } from "@zm-blood-components/common";
import * as _ from "lodash";
import { getAdmin } from "../dal/AdminDataAccessLayer";

export async function validateIsCoordinator(userId: string) {
  const admin = await getAdmin(userId);
  if (!admin) {
    console.error("Could not find calling user", userId);
    throw Error(`User ${userId} is not an admin`);
  }
}

export async function validateAppointmentEditPermissions(
  userId: string,
  hospitals: Set<Hospital>
) {
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
    throw Error("User not authorized to preform action");
  }

  return userId;
}

function adminAllowedToAddAppointments(
  admin: DbAdmin,
  requestedHospitals: Set<Hospital>
) {
  if (admin.roles.includes(AdminRole.SYSTEM_USER)) {
    return true;
  }

  const adminHospitals = new Set(admin.hospitals);

  if (admin.roles.includes(AdminRole.HOSPITAL_COORDINATOR)) {
    if (
      allHospitalsAreInAdminHospitalList(adminHospitals, requestedHospitals)
    ) {
      return true;
    }
  }

  for (const roleIndex in admin.roles) {
    switch (admin.roles[roleIndex]) {
      case AdminRole.SYSTEM_USER:
        return true;

      case AdminRole.HOSPITAL_COORDINATOR:
        if (
          allHospitalsAreInAdminHospitalList(adminHospitals, requestedHospitals)
        ) {
          return true;
        }
    }
  }

  return false;
}

function allHospitalsAreInAdminHospitalList(
  adminHospitals: Set<Hospital>,
  requestedHospitals: Set<Hospital>
) {
  for (const requestedHospital of requestedHospitals) {
    if (!adminHospitals.has(requestedHospital)) {
      console.warn("Admin is not allowed to edit", requestedHospital);
      return false;
    }
  }

  return true;
}
