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
import { DbDonor } from "../function-types";

export const confirmationReminderOnSameDayJob = functions.pubsub
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

const DISABLE_DAILY_JOB = true;
// Run every day at 19:00  Israel Time
//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const confirmationReminderOnNextDayJob = functions.pubsub
  .schedule("0 19 * * *")
  .timeZone("Asia/Jerusalem")
  .onRun(async () => {
    if (DISABLE_DAILY_JOB) {
      return;
    }
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
  functions.logger.debug(
    "Appointments that require confirmations: " + appointments.map((a) => a.id)
  );

  const donorIds = _.uniq(
    appointments.map((appointment) => appointment.donorId)
  );
  functions.logger.debug("Donors for appointment confirmation: " + donorIds);

  const donorsInAppointments = await getDonors(donorIds);
  let donorsMap: { [donorId: string]: DbDonor } = {};
  donorsInAppointments.map((donor) => {
    donorsMap[donor.id] = donor;
  });

  for (const appointment of appointments) {
    const donor = donorsMap[appointment.donorId];

    if (!donor) {
      functions.logger.error("Donor not found for donation: " + appointment.id);
      return;
    }
    await sendEmailToDonor(
      NotificationToDonor.DONATION_CONFIRMATION,
      getAppointmentNotificationData(appointment, donor),
      donor
    );
  }
};
