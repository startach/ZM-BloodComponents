import {
  addEmailToQueue,
  EmailMessage,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { ZM_LOGO_URL } from "../BookAppointmentNotifier";

export function sendEmailToDonor(
  donorEmail: string,
  dateString: string,
  hourString: string,
  hospitalName: string,
  donorFirstName: string
) {
  const html = getEmailContent(
    donorFirstName,
    dateString,
    hourString,
    hospitalName
  );

  const messageToDonor: EmailMessage = {
    to: donorEmail,
    message: {
      subject: `הרשמתך לתור לתרומת טרומבוציטים בתאריך ${dateString}`,
      html: html,
    },
  };

  return addEmailToQueue(messageToDonor);
}

function getEmailContent(
  donorFirstName: string,
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
  <body style="text-align:right; direction:rtl;">
    <img src="#logo#" alt="זכרון מנחם" />
    <h2>שלום #שם#,</h2>
    מודים לך מקרב לב על הרשמתך לתור לתרומת טרומבוציטים!
    <br />
    <h3>תורך יתקיים בביה"ח #בית_חולים# בתאריך #תאריך# בשעה #שעה#.</h3>
    במידה ולא תוכל/י להגיע, נשמח לביטול רישומך בהקדם דרך האפליקציה.
    <br />
    <br />
    <br />
    בהוקרה רבה,
    <br />
    צוות בנק הדם - זכרון מנחם
  </body>
</html>
`
    .replace("#logo#", ZM_LOGO_URL)
    .replace("#שם#", donorFirstName)
    .replace("#בית_חולים#", hospitalName)
    .replace("#תאריך#", dateString)
    .replace("#שעה#", hourString);
}
