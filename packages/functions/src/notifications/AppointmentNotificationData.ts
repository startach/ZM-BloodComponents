import {
  DateUtils,
  DbAppointment,
  DbDonor,
  LocaleUtils,
} from "@zm-blood-components/common";

export function getAppointmentNotificationData(
  appointment: DbAppointment,
  donor: DbDonor
): AppointmentNotificationData {
  const donationStartTime = appointment.donationStartTime.toDate();
  return {
    dateString: DateUtils.ToDateString(donationStartTime),
    hourString: DateUtils.ToTimeString(donationStartTime),
    hospitalName: LocaleUtils.getHospitalName(appointment.hospital),
    donorFirstName: donor.firstName,
    donorLastName: donor.lastName,
    appointmentId: appointment.id!,
  };
}

export type AppointmentNotificationData = {
  dateString: string;
  hourString: string;
  hospitalName: string;
  donorFirstName: string;
  donorLastName: string;
  appointmentId: string;
};
