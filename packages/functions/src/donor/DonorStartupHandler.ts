import { FunctionsApi } from "@zm-blood-components/common";
import geDonorHandler from "./GetDonorHandler";
import getDonorAppointmentsHandler from "./GetDonorAppointmentsHandler";
import getAvailableAppointmentsHandler from "./GetAvailableAppointmentsHandler";

export default async function (
  request: FunctionsApi.DonorStartupRequest,
  callerId: string
): Promise<FunctionsApi.DonorStartupResponse> {
  const donorId = callerId;

  const donorResponse = geDonorHandler({ donorId }, callerId);
  const donorAppointmentsResponse = getDonorAppointmentsHandler(
    { donorId },
    callerId
  );
  const availableAppointmentsResponse = getAvailableAppointmentsHandler({});

  return {
    getDonorResponse: await donorResponse,
    getDonorAppointmentsResponse: await donorAppointmentsResponse,
    getAvailableAppointmentsResponse: await availableAppointmentsResponse,
  };
}
