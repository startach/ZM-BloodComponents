import { RootState } from "../../store";
import { Appointment } from "@zm-blood-components/common";
import _ from "lodash";

export function getAppointments(state: RootState): {
  [appointmentId: string]: Appointment;
} {
  return state.appointments.appointments;
}

export function getAppointmentsInTime(
  state: RootState,
  startTimeMillis: number,
  endTimeMillis: number
): Appointment[] {
  const allAppointments = getAppointments(state);
  return _.values(allAppointments).filter(
    (a) =>
      a.donationStartTimeMillis >= startTimeMillis &&
      a.donationStartTimeMillis < endTimeMillis
  );
}
