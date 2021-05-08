import {
  addEmailsToQueue,
  EmailMessage,
  StaffRecipient,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { ZM_LOGO_URL } from "../BookAppointmentNotifier";

export function sendEmailToStaff(
  staffRecipients: StaffRecipient[],
  dateString: string,
  hourString: string,
  hospitalName: string,
  donorFirstName: string,
  donorLastName: string,
  appointmentId: string
) {
  const emails = staffRecipients.map<EmailMessage>((recipient) => ({
    to: recipient.email,
    message: {
      subject: `רישום חדש לתור ${dateString + " " + hourString}`,
      html: getEmailContent(
        recipient.name,
        donorFirstName,
        donorLastName,
        dateString,
        hourString,
        hospitalName
      ),
    },
    appointmentId,
  }));

  return addEmailsToQueue(emails);
}

function getEmailContent(
  recipientName: string,
  donorFirstName: string,
  donorLastName: string,
  dateString: string,
  hourString: string,
  hospitalName: string
) {
  return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>תודה על הרשמתך לתרומה</title>
  </head>
  <body style="text-align: right; direction: rtl">
    <img src="#logo#" alt="זכרון מנחם" />
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
    .replace("#logo#", ZM_LOGO_URL)
    .replace("#שם#", recipientName)
    .replace("#שם_התורם#", donorFirstName + " " + donorLastName)
    .replace("#בית_חולים#", hospitalName)
    .replace("#תאריך#", dateString)
    .replace("#שעה#", hourString);
}
