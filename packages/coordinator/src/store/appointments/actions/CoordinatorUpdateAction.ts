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
import { setCoordinator } from "../../coordinator/CoordinatorActions";

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

    const response = await CoordinatorFunctions.getAppointments(
      hospital,
      earliestTimeFetched,
      latestTimeFetched
    );

    dispatch(setCoordinator(response.coordinator));
    const appointmentsObject: { [appointmentId: string]: Appointment } = {};
    response.appointments.forEach(
      (appointment: Appointment) =>
        (appointmentsObject[appointment.id] = appointment)
    );

    dispatch({
      type: actionTypes.CLEAR_AND_SET_APPOINTMENTS,
      appointments: appointmentsObject,
    });
  };
