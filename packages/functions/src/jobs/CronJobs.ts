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

export const ConfirmationReminderOnSameDay = functions.pubsub
  .schedule("0 * * * *")
  .timeZone("Asia/Jerusalem")
  .onRun(async () => {
    const now = new Date();
    const lastHour = new Date();
    lastHour.setHours(lastHour.getHours() - 1);

    SendConfirmationReminders(lastHour, now);
  });

// Run every day at 00:00 AM Israel Time
//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const ConfirmationReminderOnNextDay = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("Asia/Jerusalem")
  .onRun(() => {
    const now = new Date();
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);

    SendConfirmationReminders(lastDay, now);
  });

export const SendConfirmationReminders = async (from: Date, to: Date) => {
  const appointments = await getAppointmentsByStatus(
    AppointmentStatus.BOOKED,
    from,
    to
  );

  const donorIds = appointments.map((appointment) => appointment.donorId);

  const donorsInAppointments = await getDonors(_.uniqBy(donorIds, "id"));

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
