import { DbAppointment, DbDonor } from "@zm-blood-components/common";
import {
  NotificationToCoordinator,
  NotificationToDonor,
  sendEmailToCoordinators,
  sendEmailToDonor,
} from "./NotificationSender";
import { getAppointmentNotificationData } from "./AppointmentNotificationData";
import { getStaffRecipients } from "./StaffEmailRecipientsCalculator";

export async function notifyOnAppointmentBooked(
  bookedAppointment: DbAppointment,
  donor: DbDonor
) {
  if (donor.testUser) {
    console.log("Not sending email to test user");
    return;
  }

  const appointmentNotificationData = getAppointmentNotificationData(
    bookedAppointment,
    donor
  );

  await sendEmailToDonor(
    NotificationToDonor.APPOINTMENT_BOOKED,
    appointmentNotificationData,
    donor.email
  );

  const staffEmails = await getStaffRecipients(bookedAppointment);
  await sendEmailToCoordinators(
    NotificationToCoordinator.APPOINTMENT_BOOKED,
    appointmentNotificationData,
    staffEmails
  );
}
