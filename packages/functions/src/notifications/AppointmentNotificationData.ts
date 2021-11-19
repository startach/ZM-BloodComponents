import { DateUtils, LocaleUtils } from "@zm-blood-components/common";
import { isProd } from "../utils/EnvUtils";
import { DbAppointment, DbDonor } from "../function-types";

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

  return {
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
}

function getUnsubscribeLink(isProduction: boolean, donorId: string) {
  if (isProduction) {
    return (
      "https://us-central1-blood-components-9ad48.cloudfunctions.net/unsubscribe?method=email&userId=" +
      donorId
    );
  } else {
    return (
      "https://us-central1-blood-components.cloudfunctions.net/unsubscribe?method=email&userId=" +
      donorId
    );
  }
}

function getAppointmentApprovalLink(
  isProduction: boolean,
  donorId: string,
  appointmentId: string,
  noShow: boolean
) {
  const parameters = `donorId=${donorId}&appointmentId=${appointmentId}&isNoshow=${noShow}`;

  if (isProduction) {
    return (
      "https://us-central1-blood-components-9ad48.cloudfunctions.net/completeAppointmentApiHandler?" +
      parameters
    );
  } else {
    return (
      "https://us-central1-blood-components.cloudfunctions.net/completeAppointmentApiHandler?" +
      parameters
    );
  }
}
