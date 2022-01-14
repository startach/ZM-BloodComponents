import {
  AvailableAppointment,
  DateUtils,
  Hospital,
  LocaleUtils,
} from "@zm-blood-components/common";
import * as _ from "lodash";

export type DonationDay = {
  day: string;
  hospitalSlots: HospitalDaySlots[];
};

export type HospitalDaySlots = {
  hospital: Hospital;
  slots: DonationSlot[];
};

export type DonationSlot = {
  donationStartTimeMillis: number;
  appointmentIds: string[];
};

export function groupDonationDays(
  appointments: AvailableAppointment[]
): DonationDay[] {
  return _.chain(appointments)
    .groupBy((appointment) =>
      new Date(appointment.donationStartTimeMillis).toDateString()
    )
    .map(getDonationDays)
    .sortBy(
      (donationDay) =>
        donationDay.hospitalSlots[0].slots[0].donationStartTimeMillis
    )
    .value();
}

function getDonationDays(
  appointmentsInDay: AvailableAppointment[],
  dateString: string
): DonationDay {
  const hospitalSlots: HospitalDaySlots[] = _.chain(appointmentsInDay)
    .groupBy((appointment) => appointment.hospital)
    .map((dailyAppointmentsInHospital, h) => {
      const hospital = h as Hospital;
      const hospitalDaySlots = getDonationSlotsForHospitalAndDay(
        dailyAppointmentsInHospital
      );

      const res: HospitalDaySlots = {
        hospital,
        slots: hospitalDaySlots,
      };
      return res;
    })
    .sortBy((hospitalSlot) =>
      LocaleUtils.getHospitalName(hospitalSlot.hospital)
    )
    .value();

  return {
    day: DateUtils.ToDateString(new Date(dateString)),
    hospitalSlots,
  };
}

function getDonationSlotsForHospitalAndDay(
  appointmentsInDayInHospital: AvailableAppointment[]
): DonationSlot[] {
  return _.chain(appointmentsInDayInHospital)
    .groupBy((appointment) => appointment.donationStartTimeMillis)
    .map(appointmentsToDonationSlot)
    .sortBy("donationStartTimeMillis")
    .value();
}

function appointmentsToDonationSlot(
  appointmentsInSlot: AvailableAppointment[]
): DonationSlot {
  return {
    donationStartTimeMillis: appointmentsInSlot[0].donationStartTimeMillis,
    appointmentIds: appointmentsInSlot.map((a) => a.id),
  };
}
