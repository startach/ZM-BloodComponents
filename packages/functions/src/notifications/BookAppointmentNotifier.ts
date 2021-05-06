import {
  DateUtils,
  DbDonor,
  Hospital,
  LocaleUtils,
} from "@zm-blood-components/common";
import { sendEmailToDonor } from "./notifiers/DonorBookAppointmentNotifier";
import { sendEmailToStaff } from "./notifiers/StaffBookAppointmentNotifier";

export const ZM_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/blood-components.appspot.com/o/Logo_ZM_he.jpg?alt=media&token=aa5e9d8c-d08e-4c80-ad7f-bfd361e36b20";

export async function notifyOnAppointmentBooked(
  donationStartTime: Date,
  hospital: Hospital,
  donor: DbDonor
) {
  const dateString = DateUtils.ToDateString(donationStartTime);
  const hourString = DateUtils.ToTimeString(donationStartTime);
  const hospitalName = LocaleUtils.getHospitalName(hospital);

  await sendEmailToDonor(
    donor.email,
    dateString,
    hourString,
    hospitalName,
    donor.firstName
  );

  await sendEmailToStaff(
    ["yaronmln@google.com"],
    dateString,
    hourString,
    hospitalName,
    donor.firstName,
    donor.lastName
  );
}
