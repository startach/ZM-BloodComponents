import { Donor, DonorNotificationSettings } from "@zm-blood-components/common";
import { DbDonor } from "../function-types";

export function dbDonorToDonor(dbDonor: DbDonor): Donor {
  const notificationSettings: DonorNotificationSettings =
    dbDonor.notificationSettings || {
      disableEmailNotifications: false,
    };

  return {
    ...dbDonor,
    notificationSettings: notificationSettings,
  };
}
