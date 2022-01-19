import { FunctionsApi } from "@zm-blood-components/common";
import { cancelAppointment } from "../common/CancelAppointmentHelper";

export default async function (
  request: FunctionsApi.CancelAppointmentRequest,
  callerId: string
) {
  await cancelAppointment(callerId, request, true);
}
