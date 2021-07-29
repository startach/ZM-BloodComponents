import {
  addEmailToQueue,
  EmailMessage,
} from "../../dal/EmailNotificationsDataAccessLayer";
import { LOGO_IMAGE_TAG } from "../BookAppointmentNotifier";
import { AppointmentNotificationData } from "../AppointmentNotificationData";

export function sendAppointmentDeletedEmailToDonor(
  donorEmail: string,
  data: AppointmentNotificationData
) {
  const html = getEmailContent(data);

  const messageToDonor: EmailMessage = {
    to: donorEmail,
    message: {
      subject: `ביטול תור לתרומת טרומבוציטים בתאריך ${data.date}`,
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
  <body style="text-align:right; direction:rtl;">
    #logo#
    <h2>שלום #שם#,</h2>
    <h3>התור אליו היית רשום/ה בתאריך #תאריך# בשעה #שעה# בבית החולים #בית_חולים# בוטל.</h3>
    לפרטים נוספים ניתן לפנות טלפונית למתאם/ת בית החולים או לרכז בנק מרכיבי הדם בטלפון 058−7100571.
    <br />
    <br />
    <br />
    תודה,
    <br />
    בנק מרכיבי דם | עמותת זכרון מנחם
    <br />
    להיכרות כלל פעילות העמותה 👈🏻 <a href="https://zichron.org/">https://zichron.org</a>
  </body>
</html>
`
    .replace("#logo#", LOGO_IMAGE_TAG)
    .replace("#שם#", data.donorName)
    .replace("#בית_חולים#", data.hospital)
    .replace("#תאריך#", data.date)
    .replace("#שעה#", data.time);
}
