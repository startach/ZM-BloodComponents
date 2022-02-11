import { Hospital, LocaleUtils } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import _ from "lodash";
import { isProd } from "../utils/EnvUtils";
import { DbAppointment, DbDonor } from "../function-types";
import RecipientsByHospital from "./HospitalEmailRecipients.json";

export type StaffRecipient = {
  email: string;
  name: string;
};

export async function getStaffRecipients(
  bookedAppointment: DbAppointment
): Promise<StaffRecipient[]> {
  const appointmentCreator = await getDonor(bookedAppointment.creatorUserId); // Because every admin is also saved as donor
  return getStaffRecipientsInternal(
    isProd(),
    bookedAppointment.hospital,
    RecipientsByHospital,
    appointmentCreator
  );
}

// For easier testing
export function getStaffRecipientsInternal(
  prod: boolean,
  hospital: Hospital,
  hospitalEmailRecipients: {
    [hospital: string]: string[];
  },
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
    const emailList = hospitalEmailRecipients[hospital];
    if (emailList) {
      emailList.forEach((email) =>
        res.push({
          email: email,
          name: "בית החולים " + LocaleUtils.getHospitalName(hospital),
        })
      );
    }
  }

  // Remove duplicate emails, so we don't send the same message twice
  return _.uniqBy(res, (x) => x.email);
}
