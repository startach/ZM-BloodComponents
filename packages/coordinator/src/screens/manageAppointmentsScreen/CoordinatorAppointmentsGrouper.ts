import { DateUtils, Donor, FunctionsApi } from "@zm-blood-components/common";
import * as _ from "lodash";

export type DonationDay = {
  day: string;
  appointmentSlots: AppointmentSlot[];
};

export type AppointmentSlot = {
  donationStartTimeMillis: number;
  appointments: ManagedAppointment[];
};

export type ManagedAppointment = {
  appointmentId: string;
  booked: boolean;
  donorName?: string;
  donorPhoneNumber?: string;
  bookingTimeMillis?: number;
};

export function groupAppointmentDays(
  appointments: FunctionsApi.AppointmentApiEntry[],
  donorsInAppointments: Donor[]
): DonationDay[] {
  return _.chain(appointments)
    .groupBy((appointment) =>
      new Date(appointment.donationStartTimeMillis).toDateString()
    )
    .map((appointmentsInDay, dateString) => {
      const appointmentSlotsInDay = getAppointmentSlotsInDay(
        appointmentsInDay,
        donorsInAppointments
      );

      const res: DonationDay = {
        day: DateUtils.ToDateString(new Date(dateString)),
        appointmentSlots: appointmentSlotsInDay,
      };

      return res;
    })
    .sortBy(
      (donationDay) => donationDay.appointmentSlots[0].donationStartTimeMillis
    )
    .value();
}

function getAppointmentSlotsInDay(
  appointmentsInDay: FunctionsApi.AppointmentApiEntry[],
  donorsInAppointments: Donor[]
): AppointmentSlot[] {
  return _.chain(appointmentsInDay)
    .groupBy((appointment) => appointment.donationStartTimeMillis)
    .map((appointmentsInSlot) =>
      appointmentsToAppointmentSlot(appointmentsInSlot, donorsInAppointments)
    )
    .sortBy("donationStartTimeMillis")
    .value();
}

function appointmentsToAppointmentSlot(
  appointmentsInSlot: FunctionsApi.AppointmentApiEntry[],
  donorsInAppointments: Donor[]
): AppointmentSlot {
  const arbitraryAppointment = appointmentsInSlot[0];

  return {
    donationStartTimeMillis: arbitraryAppointment.donationStartTimeMillis,
    appointments: appointmentsInSlot.map<ManagedAppointment>((a) => {
      const donor = getDonor(donorsInAppointments, a.donorId);

      return {
        appointmentId: a.id,
        booked: !!a.donorId,
        donorName: donor ? `${donor.firstName} ${donor.lastName}` : undefined,
        donorPhoneNumber: donor?.phone,
        bookingTimeMillis: a.bookingTimeMillis,
      };
    }),
  };
}

function getDonor(donors: Donor[], donorId?: string) {
  if (!donorId) {
    return undefined;
  }

  const foundDonors = donors.filter((donor) => donor.id === donorId);
  if (foundDonors.length !== 1) {
    console.error("Unexpected number of donors:", donors.length);
    return undefined;
  }

  return foundDonors[0];
}
