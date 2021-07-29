import {
  addEmailsToQueue,
  EmailMessage,
  StaffRecipient,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { LOGO_IMAGE_TAG } from "../BookAppointmentNotifier";
import { AppointmentNotificationData } from "../AppointmentNotificationData";

export function sendBookingEmailToStaff(
  staffRecipients: StaffRecipient[],
  data: AppointmentNotificationData
) {
  const emails = staffRecipients.map<EmailMessage>((recipient) => ({
    to: recipient.email,
    message: {
      subject: `רישום חדש לתור ${data.date + " " + data.time}`,
      html: getEmailContent(recipient.name, data),
    },
    appointmentId: data.appointmentId,
  }));

  return addEmailsToQueue(emails);
}

function getEmailContent(
  recipientName: string,
  data: AppointmentNotificationData
) {
  return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>תודה על הרשמתך לתרומה</title>
  </head>
  <body style="text-align: right; direction: rtl">
    #logo#
    <h2>שלום #שם#,</h2>
    התורם/ת
    <span style="font-weight: bold">#שם_התורם#</span>
    <span style="color: green; font-weight: bold">נרשם/ה</span>
    לתור אשר יתקיים בביה"ח #בית_חולים# בתאריך #תאריך# בשעה #שעה#.
    <br />
    <br />
    המשך יום טוב!
    <br />
    צוות אפליקציית זכרון מנחם
  </body>
</html>
`
    .replace("#logo#", LOGO_IMAGE_TAG)
    .replace("#שם#", recipientName)
    .replace("#שם_התורם#", data.donorName)
    .replace("#בית_חולים#", data.hospital)
    .replace("#תאריך#", data.date)
    .replace("#שעה#", data.time);
}
