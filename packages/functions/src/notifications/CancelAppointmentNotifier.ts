import { DbAppointment, DbDonor } from "@zm-blood-components/common";
import { getAppointmentNotificationData } from "./AppointmentNotificationData";
import { getStaffRecipients } from "./StaffEmailRecipientsCalculator";
import { sendCancellationEmailToStaff } from "./notifiers/StaffCancelAppointmentNotifier";

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
  await sendCancellationEmailToStaff(staffEmails, appointmentNotificationData);
}
