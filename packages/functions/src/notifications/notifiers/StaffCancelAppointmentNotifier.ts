import {
  addEmailsToQueue,
  EmailMessage,
  StaffRecipient,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { ZM_LOGO_URL } from "../BookAppointmentNotifier";
import { AppointmentNotificationData } from "../AppointmentNotificationData";

const PERIOD_48_HOURS_IN_MILLIS = 48 * 60 * 60 * 1000;

export function sendCancellationEmailToStaff(
  staffRecipients: StaffRecipient[],
  data: AppointmentNotificationData
) {
  const appointmentIsClose =
    data.donationStartTimeMillis - new Date().getTime() <
    PERIOD_48_HOURS_IN_MILLIS;

  const tilePrefix = "התפנה תור";
  const titleForCloseAppointments = appointmentIsClose ? " קרוב!" : "";
  const subject = `${tilePrefix}${titleForCloseAppointments} ${
    data.dateString + " " + data.hourString
  }`;

  const emails = staffRecipients.map<EmailMessage>((recipient) => ({
    to: recipient.email,
    message: {
      subject: subject,
      html: getEmailContent(recipient.name, data, appointmentIsClose),
    },
    appointmentId: data.appointmentId,
  }));

  return addEmailsToQueue(emails);
}

function getEmailContent(
  recipientName: string,
  data: AppointmentNotificationData,
  appointmentIsClose: boolean
) {
  return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>תור התפנה</title>
  </head>
  <body style="text-align: right; direction: rtl">
    <img src="#logo#" alt="זכרון מנחם" />
    <h2>שלום #שם#,</h2>
    התורם/ת
    <span style="font-weight: bold">#שם_התורם#</span>
    <span style="color: deeppink; font-weight: bold">הסיר/ה</span>
    עצמו/ה מתור
    <span style="color: red; font-weight: bold">#קרבה#</span>
    אשר יתקיים בביה"ח #בית_חולים# בתאריך #תאריך# בשעה #שעה#.
    <br />
    <br />
    המשך יום טוב!
    <br />
    צוות אפליקציית זכרון מנחם
  </body>
</html>
`
    .replace("#logo#", ZM_LOGO_URL)
    .replace("#שם#", recipientName)
    .replace("#שם_התורם#", data.donorFirstName + " " + data.donorLastName)
    .replace("#קרבה#", appointmentIsClose ? " קרוב " : " ")
    .replace("#בית_חולים#", data.hospitalName)
    .replace("#תאריך#", data.dateString)
    .replace("#שעה#", data.hourString);
}
