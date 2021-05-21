import { DbAppointment, DbDonor } from "@zm-blood-components/common";
import { sendEmailToDonor } from "./notifiers/DonorBookAppointmentNotifier";
import { sendEmailToStaff } from "./notifiers/StaffBookAppointmentNotifier";
import { getDonor } from "../dal/DonorDataAccessLayer";
import * as functions from "firebase-functions";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";
import { getAppointmentNotificationData } from "./AppointmentNotificationData";

export const ZM_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/blood-components.appspot.com/o/Logo_ZM_he.jpg?alt=media&token=aa5e9d8c-d08e-4c80-ad7f-bfd361e36b20";

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
  await sendEmailToStaff(staffEmails, appointmentNotificationData);
}

async function getStaffRecipients(
  bookedAppointment: DbAppointment
): Promise<StaffRecipient[]> {
  const res: StaffRecipient[] = [];
  switch (functions.config().functions.env) {
    case "prod":
      res.push({
        email: "dam@zichron.org.il",
        name: "בנק הדם",
      });
      break;

    case "stg":
      res.push({
        email: "bloodbank.ZM@gmail.com",
        name: "בנק הדם",
      });
      break;

    default:
      console.error("Could not figure env for staff email addresses");
      break;
  }

  const appointmentCreator = await getDonor(bookedAppointment.creatorUserId); // Because every admin is also saved as donor
  if (appointmentCreator?.email) {
    res.push({
      email: appointmentCreator.email,
      name: appointmentCreator.firstName,
    });
  }

  // TODO(Yaron) - add hospital coordinator here

  return res;
}
