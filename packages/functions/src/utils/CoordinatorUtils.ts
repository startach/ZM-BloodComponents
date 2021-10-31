import {
  CoordinatorRole,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { DbCoordinator } from "../function-types";

export function getCoordinatorHospitals(coordinator: DbCoordinator) {
  let hospitals: Hospital[] = [];
  switch (coordinator.role) {
    case CoordinatorRole.SYSTEM_USER:
      hospitals = HospitalUtils.activeHospitals;
      break;
    case CoordinatorRole.ZM_COORDINATOR:
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      if (coordinator.hospitals && coordinator.hospitals.length > 0) {
        // Take only active hospitals
        hospitals = coordinator.hospitals.filter((hospital) =>
          HospitalUtils.activeHospitals.includes(hospital)
        );
      }
      break;
    case CoordinatorRole.GROUP_COORDINATOR:
      break;
  }
  return hospitals;
}
