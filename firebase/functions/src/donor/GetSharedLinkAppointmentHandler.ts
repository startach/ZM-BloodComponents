import { getAppointmentByShareLink } from "../dal/AppointmentDataAccessLayer";
import {
  FunctionsApi,
} from "@zm-blood-components/common";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.GetSharedLinkAppointmentRequest,
  callerId: string
): Promise<FunctionsApi.GetSharedLinkAppointmentResponse> {
  
  if (callerId !== request.donorId) {
    throw Error("Unauthorized to access user");
  }

  const appointment = await getAppointmentByShareLink(request.shareLink)

  const result = await DbAppointmentUtils.toBookedAppointmentAsync(appointment);

  return {
    appointment: result,
  };
}
