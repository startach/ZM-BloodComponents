import { Appointment, Hospital } from "@zm-blood-components/common";
import { LOGGED_OUT } from "../login/LoginActionTypes";
import * as actionTypes from "./AppointmentsActionTypes";

export interface AppointmentsState {
  isFetching: boolean;
  hospital?: Hospital;
  appointments: { [appointmentId: string]: Appointment };
  earliestTimeFetched: number;
  latestTimeFetched: number;
}

const initialState: AppointmentsState = {
  isFetching: true,
  hospital: undefined,
  appointments: {},
  earliestTimeFetched: -1,
  latestTimeFetched: -1,
};

const reducer = (state = initialState, action: any = {}): AppointmentsState => {
  switch (action.type) {
    case actionTypes.START_FETCHING:
      return {
        hospital: action.hospital,
        appointments: {},
        isFetching: true,
        earliestTimeFetched: action.earliestStartTimeMillis,
        latestTimeFetched: action.latestStartTimeMillis,
      };

    case actionTypes.ADD_APPOINTMENTS_TO_STATE:
      const appointmentsObject = { ...state.appointments };
      action.appointments.forEach(
        (appointment: Appointment) =>
          (appointmentsObject[appointment.id] = appointment)
      );
      return {
        ...state,
        appointments: appointmentsObject,
        isFetching: false,
      };

    case actionTypes.SET_FETCHED_TIMES:
      return {
        ...state,
        earliestTimeFetched: action.earliestTimeFetched,
        latestTimeFetched: action.latestTimeFetched,
      };

    case actionTypes.DELETE_APPOINTMENT:
      const appointments = { ...state.appointments };
      delete appointments[action.appointmentId];
      return {
        ...state,
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
