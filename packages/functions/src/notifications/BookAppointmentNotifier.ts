import { DbAppointment, DbDonor } from "@zm-blood-components/common";
import { sendEmailToDonor } from "./notifiers/DonorBookAppointmentNotifier";
import { sendBookingEmailToStaff } from "./notifiers/StaffBookAppointmentNotifier";
import { getAppointmentNotificationData } from "./AppointmentNotificationData";
import { getStaffRecipients } from "./StaffEmailRecipientsCalculator";

export const ZM_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/blood-components-9ad48.appspot.com/o/blood_bank_logo.svg?alt=media&token=71adefe0-bbf9-44e0-b265-583461bd6504";

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

  await sendEmailToDonor(donor.email, appointmentNotificationData);

  const staffEmails = await getStaffRecipients(bookedAppointment);
  await sendBookingEmailToStaff(staffEmails, appointmentNotificationData);
}
