import {
  DateUtils,
  DbAppointment,
  DbDonor,
  LocaleUtils,
} from "@zm-blood-components/common";
import * as functions from "firebase-functions";
import { isProd } from "../utils/EnvUtils";

export type AppointmentNotificationData = {
  date: string;
  time: string;
  hospital: string;
  donorName: string;
  donorPhone: string;
  appointmentId: string;
  donationStartTimeMillis: number;
  unsubscribeLink: string;
};

export function getAppointmentNotificationData(
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
    unsubscribeLink: getUnsubscribeLink(donor.id),
  };
}

function getUnsubscribeLink(donorId: string) {
  if (isProd()) {
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
