import { DbAppointment, DbDonor, Hospital } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import * as functions from "firebase-functions";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";
import _ from "lodash";

function getProductionHospitalCoordinator(
  hospital: Hospital
): StaffRecipient | undefined {
  switch (hospital) {
    case Hospital.BEILINSON:
      return {
        email: "bankbloodbl@clalit.org.il",
        name: "בית החולים בילינסון",
      };
  }

  return undefined;
}

export async function getStaffRecipients(
  bookedAppointment: DbAppointment
): Promise<StaffRecipient[]> {
  const env = functions.config().functions.env;
  const appointmentCreator = await getDonor(bookedAppointment.creatorUserId); // Because every admin is also saved as donor
  return getStaffRecipientsInternal(
    env,
    bookedAppointment.hospital,
    appointmentCreator
  );
}

// For easier testing
export function getStaffRecipientsInternal(
  env: string,
  hospital: Hospital,
  appointmentCreatorUser?: DbDonor
): StaffRecipient[] {
  const res: StaffRecipient[] = [];

  switch (env) {
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

  if (appointmentCreatorUser?.email) {
    res.push({
      email: appointmentCreatorUser.email,
      name: appointmentCreatorUser.firstName,
    });
  }

  const hospitalCoordinator = getProductionHospitalCoordinator(hospital);
  if (env === "prod" && hospitalCoordinator) {
    res.push(hospitalCoordinator);
  }

  // Remove duplicate emails, so we don't send the same message twice
  return _.uniqBy(res, (x) => x.email);
}
