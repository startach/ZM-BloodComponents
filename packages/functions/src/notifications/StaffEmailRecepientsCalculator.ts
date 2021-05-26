import { DbAppointment } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import * as functions from "firebase-functions";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";

export async function getStaffRecipients(
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
