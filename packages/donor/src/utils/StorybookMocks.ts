import {
  Donor,
  BloodType,
  DonorNotificationSettings,
} from "@zm-blood-components/common";

const notificationSettingsMock: DonorNotificationSettings = {
  disableEmailNotifications: true,
};
export const mockUser: Donor = {
  id: "1",
  email: "moshe@moshe.com",
  firstName: "משה",
  lastName: "משה",
  birthDate: "2020-02-02",
  phone: "05000000",
  bloodType: BloodType.NOT_SURE,
  notificationSettings: notificationSettingsMock,
};
