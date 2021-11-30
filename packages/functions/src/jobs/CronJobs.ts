import { AppointmentStatus } from "@zm-blood-components/common/src";
import * as functions from "firebase-functions";
import { getAppointmentsByStatus } from "../dal/AppointmentDataAccessLayer";
import { getDonors } from "../dal/DonorDataAccessLayer";
import { getAppointmentNotificationData } from "../notifications/AppointmentNotificationData";
import {
  NotificationToDonor,
  sendEmailToDonor,
} from "../notifications/NotificationSender";
import _ from "lodash";
import { isProd } from "../utils/EnvUtils";

export const ConfirmationReminderOnSameDay = functions.pubsub
  .schedule("0 * * * *") // runs every hour at :00
  .timeZone("Asia/Jerusalem")
  .onRun(async () => {
    const start = new Date();
    const end = new Date();
    end.setMinutes(0);
    end.setSeconds(0);
    end.setMilliseconds(0);
    start.setHours(start.getHours() - 1);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);

    await SendConfirmationReminders(start, end);
  });

// Run every day at 19:00  Israel Time
//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const ConfirmationReminderOnNextDay = functions.pubsub
  .schedule("0 19 * * *")
  .timeZone("Asia/Jerusalem")
  .onRun(async () => {
    const now = new Date();
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);

    await SendConfirmationReminders(lastDay, now);
  });

export const SendConfirmationReminders = async (
  fromIncluding: Date,
  toExcluding: Date
) => {
  const appointments = await getAppointmentsByStatus(
    AppointmentStatus.BOOKED,
    fromIncluding,
    toExcluding
  );

  const donorIds = appointments.map((appointment) => appointment.donorId);

  const donorsInAppointments = await getDonors(_.uniq(donorIds));

  for (const appointment of appointments) {
    const donor = donorsInAppointments.find(
      (dbDonor) => dbDonor.id === appointment.donorId
    );

    if (!donor) {
      console.error("Donor not found for donation: " + appointment.id);
      return;
    }
    if (!isProd()) {
      await sendEmailToDonor(
        NotificationToDonor.DONATION_CONFIRMATION,
        getAppointmentNotificationData(appointment, donor),
        donor
      );
    }
  }
};
