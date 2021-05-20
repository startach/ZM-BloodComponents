import {
  CoordinatorRole,
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.GetCoordinatorRequest,
  callerId: string
): Promise<FunctionsApi.GetCoordinatorResponse> {
  const coordinator = await CoordinatorDAL.getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User is not a coordinator`);
  }

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

  return {
    coordinator: {
      role: coordinator.role,
      activeHospitalsForCoordinator: hospitals,
    },
  };
}
