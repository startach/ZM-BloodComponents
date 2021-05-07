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
  const coordinator = await getCoordinator(userId);
  if (!coordinator) {
    console.error("Could not find calling user", userId);
    throw Error("User is not an admin and can't edit appointments");
  }

  if (!adminAllowedToAddAppointments(coordinator, hospitals)) {
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
    const validHospitals = allHospitalsAreInCoordinatorHospitalList(
      adminHospitals,
      requestedHospitals
    );
    if (validHospitals) {
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
