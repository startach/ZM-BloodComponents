import { DbAppointment, DbDonor, Hospital } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";
import _ from "lodash";
import { isProd } from "../utils/EnvUtils";

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
  const appointmentCreator = await getDonor(bookedAppointment.creatorUserId); // Because every admin is also saved as donor
  return getStaffRecipientsInternal(
    isProd(),
    bookedAppointment.hospital,
    appointmentCreator
  );
}

// For easier testing
export function getStaffRecipientsInternal(
  isProd: boolean,
  hospital: Hospital,
  appointmentCreatorUser?: DbDonor
): StaffRecipient[] {
  const res: StaffRecipient[] = [];

  if (isProd) {
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

  const hospitalCoordinator = getProductionHospitalCoordinator(hospital);
  if (isProd && hospitalCoordinator) {
    res.push(hospitalCoordinator);
  }

  // Remove duplicate emails, so we don't send the same message twice
  return _.uniqBy(res, (x) => x.email);
}
