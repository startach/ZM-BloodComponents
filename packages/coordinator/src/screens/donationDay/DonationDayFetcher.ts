import { Hospital } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import { AppointmentSlot, DonationDay } from "../../utils/types";
import _ from "lodash";

const millisInDay = 24 * 60 * 60 * 1_000;
export async function fetchDonationDay(
  hospital: Hospital,
  dayStartTime: Date
): Promise<DonationDay> {
  const appointmentsResponse = await CoordinatorFunctions.getAppointments(
    hospital,
    dayStartTime.getTime(),
    dayStartTime.getTime() + millisInDay - 1
  );

  const slotsMap: { [appointmentStartTime: number]: AppointmentSlot } = {};

  appointmentsResponse.appointments.forEach((appointment) => {
    const slot: AppointmentSlot = slotsMap[
      appointment.donationStartTimeMillis
    ] || {
      appointments: [],
      donationStartTimeMillis: appointment.donationStartTimeMillis,
    };

    slot.appointments.push(appointment);
    slotsMap[appointment.donationStartTimeMillis] = slot;
  });

  const sortedSlots = _.values(slotsMap).sort((x) => x.donationStartTimeMillis);

  return {
    appointmentSlots: sortedSlots,
  };
}
