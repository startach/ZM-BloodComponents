import { RootState } from "../../store";
import { Appointment } from "@zm-blood-components/common";
import { getAppointments } from "./GetAppointmentsSelector";

export const getAppointmentById =
  (state: RootState) =>
  (appointmentId?: string): Appointment | undefined => {
    if (!appointmentId) {
      return undefined;
    }
    return getAppointments(state)[appointmentId];
  };
