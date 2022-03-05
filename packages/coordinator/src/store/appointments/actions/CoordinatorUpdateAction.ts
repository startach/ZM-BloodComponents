import { Appointment, CoordinatorUpdate } from "@zm-blood-components/common";
import { ThunkAction } from "../../store";
import {
  getEarliestTimeFetched,
  getLatestTimeFetched,
} from "../selectors/GetIsFetchingSelector";
import { getHospital } from "../selectors/GetHospitalSelector";
import { getAuth } from "firebase/auth";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import * as actionTypes from "../AppointmentsActionTypes";

export const handleCoordinatorUpdate =
  (update: CoordinatorUpdate): ThunkAction =>
  async (dispatch, getState) => {
    if (update.userId === getAuth().currentUser?.uid) {
      console.log("Ignoring self update");
      return;
    }
    const hospital = getHospital(getState());
    if (update.hospital !== hospital) {
      console.log("Ignoring different hospital", update.hospital);
      return;
    }

    const earliestTimeFetched = getEarliestTimeFetched(getState());
    const latestTimeFetched = getLatestTimeFetched(getState());

    const appointments = await CoordinatorFunctions.getAppointments(
      hospital,
      earliestTimeFetched,
      latestTimeFetched
    );

    const appointmentsObject: { [appointmentId: string]: Appointment } = {};
    appointments.forEach(
      (appointment: Appointment) =>
        (appointmentsObject[appointment.id] = appointment)
    );

    dispatch({
      type: actionTypes.CLEAR_AND_SET_APPOINTMENTS,
      appointments: appointmentsObject,
    });
  };
