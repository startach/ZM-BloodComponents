import { AppointmentStatus } from "common/src/types";
import * as functions from "firebase-functions";
import { getAppointmentsByStatus } from "../dal/AppointmentDataAccessLayer";
import { getDonors } from "../dal/DonorDataAccessLayer";
import { getAppointmentNotificationData } from "../notifications/AppointmentNotificationData";
import {
  NotificationToDonor,
  sendEmailToDonor,
} from "../notifications/NotificationSender";

export const ConfirmationReminderOnSameDay = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async () => {
    const topOfThisHourInMillis = new Date().setMinutes(0, 0, 0);
    const oneHourInMillis = 1000 * 60 * 60;
    // Offset by 1 ms, to avoid catching XX:00 twice
    const topOfPreviousHourInMillis =
      topOfThisHourInMillis - oneHourInMillis + 1;

    SendConfirmationReminders(
      new Date(topOfPreviousHourInMillis),
      new Date(topOfThisHourInMillis)
    );
  });

// Run every day at 11 AM Israel Time
//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const ConfirmationReminderOnNextDay = functions.pubsub
  .schedule("* 11 * * *")
  .timeZone("Asia/Jerusalem")
  .onRun(() => {
    const midnightOfToday = new Date().setHours(0, 0, 0, 0);
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    const midnightOfYesterday = midnightOfToday - oneDayInMillis;

    SendConfirmationReminders(
      new Date(midnightOfYesterday),
      new Date(midnightOfToday)
    );
  });

export const SendConfirmationReminders = async (from: Date, to: Date) => {
  const appointments = await getAppointmentsByStatus(
    AppointmentStatus.BOOKED,
    from,
    to
  );

  const donorsInAppointments = await getDonors(
    appointments.map((appointment) => appointment.donorId)
  );

  appointments.forEach((appointment) => {
    const donor = donorsInAppointments.find(
      (donor) => donor.id == appointment.donorId
    );

    if (!donor) {
      console.error("Donor not found for donation: " + appointment.id);
      return;
    }

    sendEmailToDonor(
      NotificationToDonor.DONATION_CONFIRMATION,
      getAppointmentNotificationData(appointment, donor),
      donor
    );
  });
};
