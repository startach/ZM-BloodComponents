import * as actionTypes from "../AppointmentsActionTypes";
import { Appointment } from "@zm-blood-components/common";

export function setAppointments(appointments: Appointment[]) {
  return {
    type: actionTypes.SET_APPOINTMENTS,
    appointments: appointments,
  };
}
