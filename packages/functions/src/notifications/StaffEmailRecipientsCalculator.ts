import { Hospital } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";
import _ from "lodash";
import { isProd } from "../utils/EnvUtils";
import { DbAppointment, DbDonor } from "../function-types";

export async function getStaffRecipients(
  bookedAppointment: DbAppointment
): Promise<StaffRecipient[]> {
  const appointmentCreator = await getDonor(bookedAppointment.creatorUserId); // Because every admin is also saved as donor
  return getStaffRecipientsInternal(
    isProd(),
    bookedAppointment.hospital,
    appointmentCreator
  );
}

// For easier testing
export function getStaffRecipientsInternal(
  prod: boolean,
  hospital: Hospital,
  appointmentCreatorUser?: DbDonor
): StaffRecipient[] {
  const res: StaffRecipient[] = [];

  if (prod) {
    res.push({
      email: "dam@zichron.org",
      name: "בנק הדם",
    });
  } else {
    res.push({
      email: "bloodbank.ZM@gmail.com",
      name: "בנק הדם",
    });
  }

  if (appointmentCreatorUser?.email) {
    res.push({
      email: appointmentCreatorUser.email,
      name: appointmentCreatorUser.firstName,
    });
  }

  if (prod) {
    addProductionHospitalCoordinator(hospital, res);
  }

  // Remove duplicate emails, so we don't send the same message twice
  return _.uniqBy(res, (x) => x.email);
}

function addProductionHospitalCoordinator(
  hospital: Hospital,
  res: StaffRecipient[]
): StaffRecipient | undefined {
  switch (hospital) {
    case Hospital.BEILINSON:
      res.push({
        email: "bloodbankbl@clalit.org.il",
        name: "בית החולים בילינסון",
      });
      return;
    case Hospital.SOROKA:
      res.push({
        email: "ronniema79@gmail.com",
        name: "בית החולים סורוקה",
      });
      res.push({
        email: "dumanionok@gmail.com",
        name: "בית החולים סורוקה",
      });
      res.push({
        email: "ety140@gmail.com",
        name: "בית החולים סורוקה",
      });

      return;
  }

  return undefined;
}
