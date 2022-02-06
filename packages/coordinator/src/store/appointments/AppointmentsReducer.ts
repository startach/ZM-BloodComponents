import { Appointment, Hospital } from "@zm-blood-components/common";
import { LOGGED_OUT } from "../login/LoginActionTypes";
import * as actionTypes from "./AppointmentsActionTypes";

export interface AppointmentsState {
  isFetching: boolean;
  hospital?: Hospital;
  appointments: { [appointmentId: string]: Appointment };
}

const initialState: AppointmentsState = {
  isFetching: true,
  hospital: undefined,
  appointments: {},
};

const reducer = (state = initialState, action: any = {}): AppointmentsState => {
  switch (action.type) {
    case actionTypes.SET_HOSPITAL:
      return {
        hospital: action.hospital,
        appointments: {},
        isFetching: true,
      };
    case actionTypes.SET_APPOINTMENTS:
      const appointmentsObject = { ...state.appointments };
      action.appointments.forEach(
        (appointment: Appointment) =>
          (appointmentsObject[appointment.id] = appointment)
      );
      return {
        hospital: state.hospital,
        appointments: appointmentsObject,
        isFetching: false,
      };

    case actionTypes.DELETE_APPOINTMENT:
      const appointments = { ...state.appointments };
      delete appointments[action.appointmentId];
      return {
        hospital: state.hospital,
        appointments,
        isFetching: false,
      };

    case LOGGED_OUT:
      return {
        ...initialState,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
