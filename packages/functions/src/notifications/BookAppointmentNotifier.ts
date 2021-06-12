import { DbAppointment, DbDonor } from "@zm-blood-components/common";
import { sendEmailToDonor } from "./notifiers/DonorBookAppointmentNotifier";
import { sendBookingEmailToStaff } from "./notifiers/StaffBookAppointmentNotifier";
import { getAppointmentNotificationData } from "./AppointmentNotificationData";
import { getStaffRecipients } from "./StaffEmailRecipientsCalculator";

const ZM_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/blood-components-9ad48.appspot.com/o/blood_bank_logo.svg?alt=media&token=a823db19-51f1-4663-b7ce-c6b9cb0105d0";

export const LOGO_IMAGE_TAG =
  `<img src="#logo#" alt="זכרון מנחם" style="height: 180px"/>`.replace(
    "#logo#",
    ZM_LOGO_URL
  );

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
