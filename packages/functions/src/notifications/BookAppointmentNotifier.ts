import {
  DateUtils,
  DbDonor,
  Hospital,
  LocaleUtils,
} from "@zm-blood-components/common";
import {
  addEmailToQueue,
  EmailMessage,
} from "../dal/EmailNotificationsDataAccessLayer";

export async function notifyOnAppointmentBooked(
  donationStartTime: Date,
  hospital: Hospital,
  donor: DbDonor
) {
  const donationTimeString =
    DateUtils.ToTimeString(donationStartTime) +
    " " +
    DateUtils.ToDateString(donationStartTime);
  const hospitalName = LocaleUtils.getHospitalName(hospital);
  await sendEmailToDonor(donationTimeString, hospitalName, donor);
  await sendEmailToCoordinator(donationTimeString, hospitalName, donor);
}

function sendEmailToDonor(
  donationTimeString: string,
  hospitalName: string,
  donor: DbDonor
) {
  const donorName = donor.firstName;

  const messageToDonor: EmailMessage = {
    to: [donor.email],
    message: {
      subject: `אישור קביעת תרומה - ${donationTimeString}`,
      text:
        "שלום " +
        donorName +
        ",\n" +
        "זוהי הודעת אישור לתרומה שקבעת לתאריך " +
        donationTimeString +
        " בבית החולים " +
        hospitalName +
        ".\n\n" +
        "בברכה,\n" +
        "צוות זכרון מנחם",
    },
  };

  return addEmailToQueue(messageToDonor);
}

export const COORDINATOR_EMAILS: string[] = ["bloodbank.ZM@gmail.com"];

function sendEmailToCoordinator(
  donationTimeString: string,
  hospitalName: string,
  donor: DbDonor
) {
  const donorFullName = donor.firstName + " " + donor.lastName;

  const messageToDonor: EmailMessage = {
    to: COORDINATOR_EMAILS,
    message: {
      subject: `תרומה חדשה נקבעה לתאריך ${donationTimeString}`,
      text:
        "שלום,\n" +
        "תרומה חדשה נקבעה לתאריך " +
        donationTimeString +
        " בבית החולים " +
        hospitalName +
        ".\n" +
        "שם התורם: " +
        donorFullName +
        ", טלפון: " +
        donor.phone +
        ".\n\n" +
        "בברכה,\n" +
        "צוות אפליקציית זכרון מנחם",
    },
  };

  return addEmailToQueue(messageToDonor);
}
