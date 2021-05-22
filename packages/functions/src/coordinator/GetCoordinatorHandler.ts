import { FunctionsApi } from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import { getCoordinatorHospitals } from "../utils/CoordinatorUtils";

export default async function (
  request: FunctionsApi.GetCoordinatorRequest,
  callerId: string
): Promise<FunctionsApi.GetCoordinatorResponse> {
  const coordinator = await CoordinatorDAL.getCoordinator(callerId);
  if (!coordinator) {
    console.error("Could not find calling user", callerId);
    throw Error(`User is not a coordinator`);
  }

  return {
    coordinator: {
      role: coordinator.role,
      activeHospitalsForCoordinator: getCoordinatorHospitals(coordinator),
    },
  };
}