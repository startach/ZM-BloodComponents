import { RootState } from "../../store";
import { DateUtils } from "@zm-blood-components/common";
import { AppointmentSlot, DonationDay } from "../../../utils/types";
import _ from "lodash";
import { getTimestamp } from "../../../navigation/RouterUtils";
import { getAppointmentsInTime } from "./GetAppointmentsSelector";

const millisInOneDay = 24 * 60 * 60 * 1000;

export const getAppointmentsInDay =
  (state: RootState) =>
  (dayStartTime?: Date): DonationDay | undefined => {
    if (!dayStartTime) {
      return;
    }
    const startTimeMillis = dayStartTime.getTime();
    const endTimeMillis = startTimeMillis + millisInOneDay;

    const slotsMap: { [appointmentStartTime: number]: AppointmentSlot } = {};

    getAppointmentsInTime(state, startTimeMillis, endTimeMillis)
      .filter(
        (a) =>
          a.donationStartTimeMillis >= startTimeMillis &&
          a.donationStartTimeMillis < endTimeMillis
      )
      .forEach((appointment) => {
        let slot: AppointmentSlot =
          slotsMap[appointment.donationStartTimeMillis];

        if (!slot) {
          slot = {
            appointments: [],
            donationStartTimeMillis: appointment.donationStartTimeMillis,
          };
        }

        slot.appointments.push(appointment);
        slotsMap[appointment.donationStartTimeMillis] = slot;
      });

    const sortedSlots = _.sortBy(
      _.values(slotsMap),
      (x) => x.donationStartTimeMillis
    );

    return {
      appointmentSlots: sortedSlots,
    };
  };

export function getDayStartTime(timestamp: string | undefined) {
  const time = getTimestamp(timestamp);
  if (!time) {
    return undefined;
  }

  return DateUtils.GetStartOfDay(time);
}
