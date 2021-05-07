import {
  CoordinatorRole,
  DbCoordinator,
  Hospital,
} from "@zm-blood-components/common";
import { getCoordinator } from "../dal/AdminDataAccessLayer";

export async function validateAppointmentEditPermissions(
  userId: string,
  hospitals: Set<Hospital>
) {
  const admin = await getCoordinator(userId);
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
  admin: DbCoordinator,
  requestedHospitals: Set<Hospital>
) {
  if (admin.role === CoordinatorRole.SYSTEM_USER) {
    return true;
  }

  const adminHospitals = new Set(admin.hospitals);

  if (admin.role === CoordinatorRole.ZM_COORDINATOR) {
    if (
      allHospitalsAreInCoordinatorHospitalList(
        adminHospitals,
        requestedHospitals
      )
    ) {
      return true;
    }
  }

  return false;
}

function allHospitalsAreInCoordinatorHospitalList(
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
