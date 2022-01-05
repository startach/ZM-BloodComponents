import { DateUtils, LocaleUtils } from "@zm-blood-components/common";
import { isProd } from "../utils/EnvUtils";
import { DbAppointment, DbDonor } from "../function-types";
import { getHttpFunction } from "../utils/HttpFunctionsUtils";
import * as functions from "firebase-functions";

export type AppointmentNotificationData = {
  date: string;
  time: string;
  hospital: string;
  donorName: string;
  donorPhone: string;
  appointmentId: string;
  donationStartTimeMillis: number;
  unsubscribeLink: string;
  donationApprovalLink: string;
  donationNoShowLink: string;
};

export function getAppointmentNotificationData(
  appointment: DbAppointment,
  donor: DbDonor
): AppointmentNotificationData {
  return calculateNotificationData(isProd(), appointment, donor);
}

// Exported for testing
export function calculateNotificationData(
  isProduction: boolean,
  appointment: DbAppointment,
  donor: DbDonor
): AppointmentNotificationData {
  const donationStartTime = appointment.donationStartTime.toDate();

  const res = {
    appointmentId: appointment.id!,
    date: DateUtils.ToDateString(donationStartTime),
    time: DateUtils.ToTimeString(donationStartTime),
    hospital: LocaleUtils.getHospitalName(appointment.hospital),
    donorName: donor.firstName + " " + donor.lastName,
    donorPhone: donor.phone,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
    unsubscribeLink: getUnsubscribeLink(isProduction, donor.id),
    donationApprovalLink: getAppointmentApprovalLink(
      isProduction,
      donor.id,
      appointment.id!,
      false
    ),
    donationNoShowLink: getAppointmentApprovalLink(
      isProduction,
      donor.id,
      appointment.id!,
      true
    ),
  };

  functions.logger.debug(
    "AppointmentNotificationData is " + JSON.stringify(res)
  );
  return res;
}

function getUnsubscribeLink(isProduction: boolean, donorId: string) {
  const parameters = `method=email&userId=${donorId}`;

  return getHttpFunction(isProduction, "unsubscribe", parameters);
}

function getAppointmentApprovalLink(
  isProduction: boolean,
  donorId: string,
  appointmentId: string,
  noShow: boolean
) {
  const parameters = `donorId=${donorId}&appointmentId=${appointmentId}&isNoshow=${noShow}`;

  return getHttpFunction(
    isProduction,
    "completeAppointmentApiHandler",
    parameters
  );
}
