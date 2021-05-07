import {
  addEmailToQueue,
  EmailMessage,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { ZM_LOGO_URL } from "../BookAppointmentNotifier";

export function sendEmailToStaff(
  emails: string[],
  dateString: string,
  hourString: string,
  hospitalName: string,
  donorFirstName: string,
  donorLastName: string,
  appointmentId: string
) {
  const html = getEmailContent(
    donorFirstName,
    donorLastName,
    dateString,
    hourString,
    hospitalName
  );

  const messageToDonor: EmailMessage = {
    to: emails,
    message: {
      subject: `רישום חדש לתור ${dateString + " " + hourString}`,
      html: html,
    },
    appointmentId
  };

  return addEmailToQueue(messageToDonor);
}

function getEmailContent(
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
    <h2>שלום,</h2>
    התורם/ת
    <span style="font-weight: bold">#שם_מלא#</span>
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
    .replace("#שם_מלא#", donorFirstName + " " + donorLastName)
    .replace("#בית_חולים#", hospitalName)
    .replace("#תאריך#", dateString)
    .replace("#שעה#", hourString);
}
