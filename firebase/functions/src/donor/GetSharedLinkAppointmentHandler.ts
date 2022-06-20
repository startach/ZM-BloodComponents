import { getAppointmentByShareLink } from "../dal/AppointmentDataAccessLayer";
import {
  FunctionsApi,
} from "@zm-blood-components/common";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";

export default async function (
  request: FunctionsApi.GetSharedLinkAppointmentRequest
): Promise<FunctionsApi.GetSharedLinkAppointmentResponse> {
  const appointment = await getAppointmentByShareLink(request.share_link)

  const result = await DbAppointmentUtils.toBookedAppointmentAsync(appointment);

  return {
    appointment: result,
  };
}
