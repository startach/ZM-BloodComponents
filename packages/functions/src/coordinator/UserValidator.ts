import { CoordinatorRole, Hospital } from "@zm-blood-components/common";
import { getCoordinator } from "../dal/AdminDataAccessLayer";
import { DbCoordinator } from "../function-types";

export async function validateAppointmentEditPermissions(
  userId: string,
  hospital: Hospital
) {
  const coordinator = await getCoordinator(userId);
  validateAppointmentPermissions(new Set<Hospital>([hospital]), coordinator);
  return userId;
}

export function validateAppointmentPermissions(
  hospitals: Set<Hospital>,
  coordinator?: DbCoordinator
) {
  if (!coordinator) {
    throw Error("User is not a coordinator and can't edit appointments");
  }

  if (!adminAllowedToAddAppointments(coordinator, hospitals)) {
    console.error(
      "User",
      coordinator.id,
      "role does not allow adding appointments to",
      hospitals
    );
    throw Error("Coordinator has no permissions for hospital");
  }
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
