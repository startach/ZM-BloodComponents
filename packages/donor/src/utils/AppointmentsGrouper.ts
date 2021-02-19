import { AvailableAppointment, Hospital } from "@zm-blood-components/common";
import * as DateUtils from "./DateUtil";
import * as _ from "lodash";

type DonationDay = {
  day: string;
  donationSlots: DonationSlot[];
};

export type DonationSlot = {
  donationStartTime: Date;
  hospital: Hospital;
  appointmentIds: string[];
};

export function groupDonationDays(
  appointments: AvailableAppointment[]
): DonationDay[] {
  return _.chain(appointments)
    .groupBy((appointment) => appointment.donationStartTime.toDateString())
    .map((appointmentsInDay, dateString) => {
      const donationSlotsInDay = getDonationSlotsInDay(appointmentsInDay);

      const res: DonationDay = {
        day: DateUtils.ToDateString(new Date(dateString)),
        donationSlots: donationSlotsInDay,
      };

      return res;
    })
    .sortBy("donationStartTime")
    .value();
}

function getDonationSlotsInDay(
  appointmentsInDay: AvailableAppointment[]
): DonationSlot[] {
  return _.chain(appointmentsInDay)
    .groupBy(
      (appointment) =>
        appointment.hospital + appointment.donationStartTime.toISOString()
    )
    .map(appointmentsToDonationSlot)
    .sortBy("donationStartTime")
    .value();
}

function appointmentsToDonationSlot(
  appointmentsInSlot: AvailableAppointment[]
): DonationSlot {
  const arbitraryAppointment = appointmentsInSlot[0];

  return {
    donationStartTime: arbitraryAppointment.donationStartTime,
    hospital: arbitraryAppointment.hospital,
    appointmentIds: appointmentsInSlot.map((a) => a.id),
  };
}

export function getHospitalsList(appointments: AvailableAppointment[]) {
  const uniqueEntries = new Set(appointments.map((x) => x.hospital));
  return Array.from(uniqueEntries.values());
}
