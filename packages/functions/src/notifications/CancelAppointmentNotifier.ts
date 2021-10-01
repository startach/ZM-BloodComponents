import { getAppointmentNotificationData } from "./AppointmentNotificationData";
import { getStaffRecipients } from "./StaffEmailRecipientsCalculator";
import {
  NotificationToCoordinator,
  sendEmailToCoordinators,
} from "./NotificationSender";
import { DbAppointment, DbDonor } from "../function-types";

const PERIOD_48_HOURS_IN_MILLIS = 48 * 60 * 60 * 1000;

export async function notifyOnCancelAppointment(
  appointment: DbAppointment,
  donor: DbDonor
) {
  if (donor.testUser) {
    console.log("Not sending email to test user");
    return;
  }

  const appointmentNotificationData = getAppointmentNotificationData(
    appointment,
    donor
  );

  const staffEmails = await getStaffRecipients(appointment);

  const type =
    appointmentNotificationData.donationStartTimeMillis - new Date().getTime() <
    PERIOD_48_HOURS_IN_MILLIS
      ? NotificationToCoordinator.CLOSE_APPOINTMENT_CANCELLED_BY_DONOR
      : NotificationToCoordinator.APPOINTMENT_CANCELLED_BY_DONOR;

  await sendEmailToCoordinators(type, appointmentNotificationData, staffEmails);
}
