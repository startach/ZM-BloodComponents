import {
  DateUtils,
  DbAppointment,
  DbDonor,
  LocaleUtils,
} from "@zm-blood-components/common";

export type AppointmentNotificationData = {
  date: string;
  time: string;
  hospital: string;
  donorName: string;
  donorPhone: string;
  appointmentId: string;
  donationStartTimeMillis: number;
};

export function getAppointmentNotificationData(
  appointment: DbAppointment,
  donor: DbDonor
): AppointmentNotificationData {
  const donationStartTime = appointment.donationStartTime.toDate();
  return {
    appointmentId: appointment.id!,
    date: DateUtils.ToDateString(donationStartTime),
    time: DateUtils.ToTimeString(donationStartTime),
    hospital: LocaleUtils.getHospitalName(appointment.hospital),
    donorName: donor.firstName + " " + donor.lastName,
    donorPhone: donor.phone,
    donationStartTimeMillis: appointment.donationStartTime.toMillis(),
  };
}
