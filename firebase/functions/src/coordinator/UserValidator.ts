import { CoordinatorRole, Hospital } from "@zm-blood-components/common";
import { DbCoordinator } from "../function-types";

export function validateAppointmentEditPermissions(
  hospital: Hospital,
  coordinator?: DbCoordinator
) {
  if (!coordinator) {
    throw Error("User is not a coordinator and can't edit appointments");
  }

  if (!adminAllowedToAddAppointments(coordinator, hospital)) {
    console.error(
      "User",
      coordinator.id,
      "role does not allow adding appointments to",
      hospital
    );
    throw Error("Coordinator has no permissions for hospital");
  }
}

function adminAllowedToAddAppointments(
  admin: DbCoordinator,
  hospital: Hospital
) {
  switch (admin.role) {
    case CoordinatorRole.SYSTEM_USER:
      return true;

    case CoordinatorRole.HOSPITAL_COORDINATOR:
      return admin.hospitals?.includes(hospital);
    case CoordinatorRole.ADVOCATE:
      return false;
  }

  return false;
}
