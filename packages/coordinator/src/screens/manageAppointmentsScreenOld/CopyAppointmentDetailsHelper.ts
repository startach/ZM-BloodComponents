import { DateUtils } from "@zm-blood-components/common";

export function getAppointmentCopyStringContent(
  donorName: string,
  donorPhoneNumber: string,
  donationStartTimeMillis: number
) {
  return `${donorName}, ${String(donorPhoneNumber)}, ${DateUtils.ToDateString(
    donationStartTimeMillis
  )} ${DateUtils.ToTimeString(donationStartTimeMillis)}`;
}
