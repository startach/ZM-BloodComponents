import {
  addEmailToQueue,
  EmailMessage,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { ZM_LOGO_URL } from "../BookAppointmentNotifier";
import { AppointmentNotificationData } from "../AppointmentNotificationData";

export function sendEmailToDonor(
  donorEmail: string,
  data: AppointmentNotificationData
) {
  const html = getEmailContent(data);

  const messageToDonor: EmailMessage = {
    to: donorEmail,
    message: {
      subject: `הרשמתך לתור לתרומת טרומבוציטים בתאריך ${data.dateString}`,
      html: html,
    },
    appointmentId: data.appointmentId,
  };

  return addEmailToQueue(messageToDonor);
}

function getEmailContent(data: AppointmentNotificationData) {
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
    בקרוב תתקשר אליך מתאמת התורים של ביה"ח להמשך תיאום.
    <br />
    <br />
    נא לא לשכוח:
    <br />
    - לשתות מים.
    <br />
    - להביא דברים מתוקים לאכול בזמן התרומה ואחריה.
    <br />
    - וכמובן שבמידה ולא תוכל/י להגיע, נשמח לביטול רישומך בהקדם דרך האפליקציה.
    <br />
    <br />
    לכל שאלה ובירור נוסף ניתן לפנות:
    <br />
    למייל: dam@zichron.org
    <br />
    או לטלפון: 058-7100571
    <br />
    <br />
    <br />
    בהערכה רבה,
    <br />
    בנק מרכיבי דם | עמותת זכרון מנחם
    <br />
    להיכרות כלל פעילות העמותה 👈🏻 <a href="https://zichron.org/">https://zichron.org</a>
  </body>
</html>
`
    .replace("#logo#", ZM_LOGO_URL)
    .replace("#שם#", data.donorFirstName + " " + data.donorLastName)
    .replace("#בית_חולים#", data.hospitalName)
    .replace("#תאריך#", data.dateString)
    .replace("#שעה#", data.hourString);
}
