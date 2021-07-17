import { FunctionsApi } from "@zm-blood-components/common";
import * as CoordinatorDAL from "../dal/AdminDataAccessLayer";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
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
  const coordinatorDonorUser = await DonorDAL.getDonor(callerId);

  return {
    coordinator: {
      role: coordinator.role,
      activeHospitalsForCoordinator: getCoordinatorHospitals(coordinator),
      name: coordinatorDonorUser
        ? `${coordinatorDonorUser.firstName} ${coordinatorDonorUser.lastName}`
        : undefined,
    },
  };
}
