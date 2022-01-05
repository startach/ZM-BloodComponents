import { CoordinatorRole, Hospital } from "@zm-blood-components/common";
import { getCoordinator } from "../dal/AdminDataAccessLayer";
import { DbCoordinator } from "../function-types";

export async function validateAppointmentEditPermissions(
  userId: string,
  hospitals: Set<Hospital>
) {
  const admin = await getCoordinator(userId);
  if (!admin) {
    console.error("Could not find calling user", userId);
    throw Error("User is not a coordinator and can't edit appointments");
  }

  if (!adminAllowedToAddAppointments(admin, hospitals)) {
    console.error(
      "User",
      userId,
      "role does not allow adding appointments to",
      hospitals
    );
    throw Error("Coordinator has no permissions for hospital");
  }

  return userId;
}

function adminAllowedToAddAppointments(
  admin: DbCoordinator,
  requestedHospitals: Set<Hospital>
) {
  switch (admin.role) {
    case CoordinatorRole.SYSTEM_USER:
      return true;

    case CoordinatorRole.ZM_COORDINATOR:
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      const adminHospitals = new Set(admin.hospitals);
      return allHospitalsAreInCoordinatorHospitalList(
        adminHospitals,
        requestedHospitals
      );
    case CoordinatorRole.GROUP_COORDINATOR:
      return false;
  }

  return false;
}

function allHospitalsAreInCoordinatorHospitalList(
  adminHospitals: Set<Hospital>,
  requestedHospitals: Set<Hospital>
) {
  for (const requestedHospital of Array.from(requestedHospitals)) {
    if (!adminHospitals.has(requestedHospital)) {
      console.warn("Admin is not allowed to edit", requestedHospital);
      return false;
    }
  }

  return true;
}
